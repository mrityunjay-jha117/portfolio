import { Hono } from "hono";
import { z } from "zod";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";

const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
  };
}>();

// GET / -> list blogs (paginated)
blogRouter.get("/", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
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

// NOTE: admin listing removed. Admins may create/delete by id only.

// GET /:id -> get a blog by id
blogRouter.get("/:id", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const id = c.req.param("id");
  const item = await prisma.blog.findUnique({ where: { id } });
  if (!item) return c.json({ error: "Not found" }, 404);
  return c.json(item);
});

// POST / -> create 
blogRouter.post("/create",  async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const body = await c.req.json();

  const schema = z.object({
    title: z.string(),
    // schema.prisma requires tags: String[] (non-nullable) so require it here.
    tags: z.array(z.string()),
    // schema.prisma requires link: String (non-nullable)
    link: z.string(),
  });

  const parsed = schema.safeParse(body);
  if (!parsed.success) return c.json({ error: parsed.error.errors }, 400);

  // normalize arrays and lowercase tags
  const dataToSave: any = {
    title: parsed.data.title,
    tags: parsed.data.tags.map((t: string) => t.toLowerCase()),
    link: parsed.data.link,
  };

  const created = await prisma.blog.create({ data: dataToSave as any });
  return c.json(created, 201);
});

// DELETE /:id -> delete 
blogRouter.delete("/:id",  async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const id = c.req.param("id");
  await prisma.blog.delete({ where: { id } });
  return c.json({ ok: true });
});

export default blogRouter;
