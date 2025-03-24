export * as api from "./endpoints/index.js";

import fastify from "fastify";
import { AsyncFn, collectApiFunctions } from "create-typed-sdk";
import * as endpoints from "./endpoints/index.js";
import cors from "@fastify/cors";

const PATH_PREFIX_FOR_UNTRUSTED = "/api/";

const app = fastify({
  disableRequestLogging: true,
  requestTimeout: 5000,
});

app.register(cors, { origin: "*" });

app.get("/", async () => {
  return {
    hello: "world",
    dateMS: Date.now(),
  };
});

collectApiFunctions(endpoints).forEach((a) => {
  const path = a.path.join("/");
  const fullPath = PATH_PREFIX_FOR_UNTRUSTED + path;
  app.post(fullPath, async (req, res) => {
    await clientPostHandler(a.path, a.fn, req, res);
  });
});

function main() {
  console.log("Start server on port 3020", "ouskBzVPTm");
  app.listen({ port: 3020, host: "0.0.0.0" }, (err, address) => {
    if (err) throw err;
    console.log(`Server is now listening on ${address}`);
  });
}

async function clientPostHandler(
  apiPath: string[],
  apiFn: AsyncFn,
  req: any,
  resp: any
) {
  const path = apiPath.join("/");
  const fullPath = PATH_PREFIX_FOR_UNTRUSTED + path;
  const start = Date.now();

  try {
    const body = req.body as any;
    if (!body?.payload) {
      return;
    }

    const payload = (req.body as any).payload;

    const val: any = await apiFn(payload);

    const elapsedTimeMs = Date.now() - start;

    return resp.send(val);
  } catch (e: any) {
    // TODO: it would be better to distinguish ill-formed requests vs server-side errors
    return resp.code(500).send({
      msg: "Internal Error.",
      path: fullPath,
    });
  }
}

main();
