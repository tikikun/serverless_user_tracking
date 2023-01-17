/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `wrangler dev src/index.ts` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `wrangler publish src/index.ts --name my-worker` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

export interface Env {
  DB: D1Database;
}

export default {
  async fetch(request: Request, env: Env) {
    const { pathname } = new URL(request.url);
    if (pathname === "/api/events_tracked") {
      const { results } = await env.DB.prepare(
        "SELECT * FROM track_events"
      ).all();
      return Response.json(results);
    }

    if (pathname === "/api/open_track") {
      const { searchParams } = new URL(request.url);
      let event_name = searchParams.get("event_name");
      let userid = searchParams.get("userid");
      if (event_name === null) {
        return new Response("You need to specify event_name parameter");
      }
      if (userid === null) {
        return new Response("You need to specify userid parameter");
      }

      console.log("Record this open action ");
      var event_stmt = env.DB.prepare(
        "INSERT INTO track_events (userid,event_name,event_time) VALUES (?,?, CURRENT_TIMESTAMP)"
      ).bind(userid, event_name);
      event_stmt.run();
      return new Response(`Recorded event named: ${event_name} for user with userid: ${userid}`);
    }

    return new Response("Call /api/events_tracked to see tracked events");
  },
};
