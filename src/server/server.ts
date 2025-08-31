import * as restify from "restify";
import { environment } from "../common/environment";

export class Server {
  aplication: restify.Server;

  initRoutes(): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
        this.aplication = restify.createServer({
          name: "restify-estudy",
          version: "1.0.0",
        });

        this.aplication.use(restify.plugins.queryParser());

        //routes

        this.aplication.get("/", (req, resp, next) => {
          resp.json({
            msg: "Hello Word!",
          });
          return next();
        });

        this.aplication.listen(environment.server.port, () => {
          resolve(this.aplication);
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  bootstrap(): Promise<Server> {
    return this.initRoutes().then(() => this);
  }
}
