import * as config from "config";
import * as express from "express";
import * as bodyParser from "body-parser";
import * as cookieParser from "cookie-parser";
import * as middlewares from "./middlewares";
import * as routers from "./routers";
import { createServer } from "http";
import { RouterMetaData } from "./interfaces";
import { expressRouterWrapper } from "./utils";

/**
 * The server uses a single process and a single thread.
 * If you use a thread pool, it uses four threads by default.
 * If you have a lot of IO activity, you should set up your environment to increase the number of thread pools.
 */
class Server {
  public isBoot: boolean = false;

  private readonly application: express.Express = express();
  private readonly server = createServer(this.application);

  constructor() {
    console.log("server init");
  }

  /**
   * Server start
   */
  public start() {
    this.initModules();
    this.initBeforeMiddleware();
    this.initRouters();
    this.initAfterMiddlewares();

    this.server.listen(config.get("server.port"));
    this.isBoot = true;
  }

  /**
   * Modules running before middleware
   */
  private initModules() {
    this.application.use(bodyParser.json({ type: "application/json" }));
    this.application.use(bodyParser.urlencoded({ extended: true }));
    this.application.use(cookieParser());
  }

  /**
   * Modules running after middleware2
   */
  private initAfterMiddlewares() {
    this.application.use(middlewares.routerNotFound);
    this.application.use(middlewares.errorHandler);
  }

  /**
   * Middleware loading to use
   */
  private initBeforeMiddleware() {
    this.application.use(middlewares.responseCors);
  }

  /**
   * Load Routers
   */
  private initRouters() {
    const objectRouters = Object(routers);

    Object.keys(objectRouters).forEach((routerKey) => {
      const context = objectRouters[routerKey] as RouterMetaData;

      if (context instanceof Object) {
        this.application.use(
          context.routerName,
          ...context.beforeMiddlewares.map((name) => middlewares[name]),
          expressRouterWrapper(context.router),
          ...context.afterMiddlewares.map((name) => middlewares[name])
        );
      }
    });
  }
}

export default new Server();
