import { Hono } from "hono";
import blogRouter from "./routes/blog";

import { cors } from "hono/cors";

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    SECRET_CODE: string;
    CLOUDINARY_CLOUD_NAME: string;
    CLOUDINARY_API_KEY: string;
    GEMINI_API: string;
    CLOUDINARY_API_SECRET: string;
  };
}>();

app.use(
  "/api/*",
  cors({
    origin: "*",
  })
);

app.route("/api/v1/blog", blogRouter);

app.get("/", (c) => {
  return c.html(`
    <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: black;
            
          }
          p {
 
  color: white;
  font-size: 0.9rem; 
}

          a {
          color:white
            text-decoration: underline;
          }
          
        </style>
      </head>
      <body>
        <p>
          Hello, this is my backend for my portfolio website.<br/>
          Here you can get more info about me and my work.<br/>
          Check out my
          <a href="https://github.com/mrityunjay-jha117" target="_blank">GitHub</a>.
        </p>
      </body>
    </html>
  `);
});

export default app;
