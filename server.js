import { file } from "bun";

const PORT = Number(process.env.PORT) || 3000;

const server = Bun.serve({
  port: PORT,
  fetch(req) {
    const url = new URL(req.url);
    let pathname = url.pathname;
    
    if (pathname === "/" || pathname === "") {
      pathname = "/index.html";
    }

    const localPath = `.${pathname}`;
    const targetFile = file(localPath);

    return new Response(targetFile);
  },
  error(err) {
    return new Response(`Server error: ${err.message}`, { status: 500 });
  }
});

console.log(`🚀 Resume local dev server is running at: http://localhost:${server.port}`);
console.log(`👉 Press Ctrl+C to stop.`);
