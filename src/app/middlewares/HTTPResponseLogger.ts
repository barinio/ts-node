import type { Request, Response, NextFunction } from "express";
import type { ExpressMiddlewareInterface } from "routing-controllers";

export class HTTPResponseLogger implements ExpressMiddlewareInterface {
  use(request: Request, response: Response, next: NextFunction) {
    const { originalUrl, method } = request;

    const { statusCode } = response;

    console.log(`Received request: methon=${method} path=${originalUrl} statusCode=${statusCode}`);

    next();
  }
}
