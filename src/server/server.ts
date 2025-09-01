import * as restify from "restify";
import { Router } from "../common/router";
import { environment } from "../common/environment";

export class Server {
  application: restify.createServer;

  async initRoutes(router: Router[]): Promise<any> {
    try {
      /**
       *
       *  Configurando o server
       *
       */
      this.application = restify.createServer({
        name: "restify-estudy",
        version: "1.0.0",
      });
      /**
       *
       * Configurando plugins
       *
       */
      this.application.use(restify.plugins.queryParser());
      /**
       *
       * Routes
       * @example
       *
       */
      router.forEach((el) => el.applyRoutes(this.application));
      /**
       *
       * Startando o servidor > listen
       *
       */
      this.application.listen(environment.server.port, () => {
        return this;
      });
    } catch (error) {
      console.log(error);
    }
  }
  /**
   *
   * Ponta pé inicial do servidor
   *
   */
  async bootstrap(router: Router[] = []): Promise<Server> {
    await this.initRoutes(router);
    return this;
  }
}
