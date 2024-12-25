import path from "node:path";
import url from "node:url";

export default {
  path: path.dirname(url.fileURLToPath(import.meta.url)) + "/../",
  title: "Shuffle Clone API",
  version: "1.0.0",
  description: "",
  tagIndex: 2,
  info: {
    title: "Shuffle Clone API",
    description: "",
  },
  snakeCase: true,

  debug: false,
  ignore: ["/swagger", "/docs"],
  preferredPutPatch: "PUT",
  common: {
    parameters: {},
    headers: {},
  },
  authMiddlewares: ["auth", "auth:api"],
  defaultSecurityScheme: "BearerAuth",
  persistAuthorization: true,
  showFullPath: false,
};
