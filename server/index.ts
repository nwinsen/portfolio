import { serve } from "bun";

const PORT = 3030;

serve({
  port: PORT,
  async fetch(request) {
    const {method} = request;
    const {pathname}
    return new Response("Hello");
  },
});

console.log("server listening on 3030");
