/// <reference lib="dom" />
import { Hono } from "hono";
// @ts-ignore - runtime provides crypto in the target environment
import { createHash } from "crypto";

const imageRouter = new Hono<{
  Bindings: {
    CLOUDINARY_CLOUD_NAME: string;
    CLOUDINARY_API_KEY: string;
    CLOUDINARY_API_SECRET: string;
  };
}>();

imageRouter.post("/upload", async (c) => {
  const env = c.env;

  // basic env validation
  if (
    !env.CLOUDINARY_CLOUD_NAME ||
    !env.CLOUDINARY_API_KEY ||
    !env.CLOUDINARY_API_SECRET
  ) {
    return c.json({ error: "Server not configured for image uploads" }, 500);
  }

  const form = await c.req.formData();
  // accept either `file` or `image` field for flexibility
  const fileField = form.get("file") || form.get("image");

  // In some runtimes File may not be available as a global constructor; fall back to duck-typing
  const isFileLike = (f: any) =>
    f && typeof f === "object" && typeof f.arrayBuffer === "function";

  if (!fileField || !isFileLike(fileField)) {
    return c.json(
      { error: "No valid file uploaded. Use `file` or `image` field." },
      400
    );
  }

  try {
    const anyFile: any = fileField;
    const arrayBuffer = await anyFile.arrayBuffer();

    // protect against very large uploads (e.g. > 10MB)
    const MAX_BYTES = 10 * 1024 * 1024;
    if (arrayBuffer.byteLength > MAX_BYTES) {
      return c.json({ error: "File too large" }, 413);
    }

    // create base64 string; prefer Buffer if available in runtime
    const base64 = (globalThis as any).Buffer
      ? (globalThis as any).Buffer.from(arrayBuffer).toString("base64")
      : btoa(String.fromCharCode(...new Uint8Array(arrayBuffer)));

    const folder = "my_uploads";
    const transformation = "q_auto,f_auto,w_1000"; // optimize image
    const timestamp = Math.floor(Date.now() / 1000);

    // include upload params in signature (sorted by param name)
    const secret = String(env.CLOUDINARY_API_SECRET);
    const signatureBase = `folder=${folder}&timestamp=${timestamp}&transformation=${transformation}${secret}`;
    const signature = createHash("sha1").update(signatureBase).digest("hex");

    const cloudForm = new FormData();
    // include mime type if available
    const mime = (fileField as any).type || "application/octet-stream";
    cloudForm.append("file", `data:${mime};base64,${base64}`);
    cloudForm.append("api_key", env.CLOUDINARY_API_KEY);
    cloudForm.append("timestamp", timestamp.toString());
    cloudForm.append("folder", folder);
    cloudForm.append("signature", signature);
    cloudForm.append("transformation", transformation);

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${env.CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: cloudForm,
      }
    );

    const data = await res.json();

    if (!res.ok) {
      return c.json({ error: "Upload failed", details: data }, 500);
    }

    // cloudinary may return `secure_url` or `url` depending on settings
    const url = data.secure_url || data.url;
    if (!url) {
      return c.json(
        { error: "Upload succeeded but no URL returned", details: data },
        500
      );
    }

    return c.json({ url });
  } catch (err: any) {
    // log server-side (if you have a logger you can use it here)
    console.error("Image upload error:", err);
    return c.json(
      { error: "Upload failed", details: err?.message || String(err) },
      500
    );
  }
});

export default imageRouter;
