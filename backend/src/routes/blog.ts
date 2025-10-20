import { Hono } from "hono";
import { z } from "zod";
import { PrismaClient } from "@prisma/client";
// @ts-ignore: some environments/types may not expose the typed export
import accelerate from "@prisma/extension-accelerate";

// Use Prisma Accelerate extension to boot on the database where supported
const prisma = new PrismaClient().$extends((accelerate as any)());

const blogRouter = new Hono();

function authRequired(c: any) {
  const provided = c.req.header("x-admin-password");
  const expected = c.env.ADMIN_PASSWORD;
  if (!expected || provided !== expected) return false;
  return true;
}

// GET / -> list blogs (paginated)
blogRouter.get("/", async (c) => {
  const q = c.req.query();
  const page = Math.max(1, Number(q.page) || 1);
  const limit = Math.min(50, Math.max(1, Number(q.limit) || 10));
  const skip = (page - 1) * limit;
  // list all blogs (schema stores description as Json)
  const [items, total] = await Promise.all([
    prisma.blog.findMany({
      orderBy: { createdAt: "desc" },
      skip,
      take: limit,
    }),
    prisma.blog.count(),
  ]);

  return c.json({ items, total, page, limit });
});

// GET /auth -> verify admin password (header)
blogRouter.get("/auth", async (c) => {
  const ok = authRequired(c);
  return c.json({ ok });
});

// NOTE: admin listing removed. Admins may create/update/delete by id only.

// GET /:id -> get a blog by id
blogRouter.get("/:id", async (c) => {
  const id = c.req.param("id");
  const item = await prisma.blog.findUnique({ where: { id } });
  if (!item) return c.json({ error: "Not found" }, 404);
  return c.json(item);
});

// POST / -> create (protected)
blogRouter.post("/", async (c) => {
  if (!authRequired(c)) return c.json({ error: "unauthorized" }, 401);
  const body = await c.req.json();

  const segment = z.object({
    text: z.string().optional(),
    images: z.array(z.string()).optional(),
  });
  const schema = z.object({
    title: z.string(),
    description: z.array(segment),
    tags: z.array(z.string()).optional(),
    additional_links: z.array(z.string()).optional(),
    code_link: z.string().optional(),
  });

  const parsed = schema.safeParse(body);
  if (!parsed.success) return c.json({ error: parsed.error.errors }, 400);

  // normalize arrays and lowercase tags
  const dataToSave: any = {
    title: parsed.data.title,
    description: parsed.data.description,
    tags: (parsed.data.tags || []).map((t: string) => t.toLowerCase()),
    additional_links: parsed.data.additional_links || [],
    code_link: parsed.data.code_link || undefined,
  };

  const created = await prisma.blog.create({ data: dataToSave as any });
  return c.json(created, 201);
});

// PUT /:id -> update (protected)
blogRouter.put("/:id", async (c) => {
  if (!authRequired(c)) return c.json({ error: "unauthorized" }, 401);
  const id = c.req.param("id");
  const body = await c.req.json();
  const updated = await prisma.blog.update({
    where: { id },
    data: body as any,
  });
  return c.json(updated);
});

// DELETE /:id -> delete (protected)
blogRouter.delete("/:id", async (c) => {
  if (!authRequired(c)) return c.json({ error: "unauthorized" }, 401);
  const id = c.req.param("id");
  await prisma.blog.delete({ where: { id } });
  return c.json({ ok: true });
});

export default blogRouter;
