import { NextFunction, Request, RequestHandler, Response } from "express";

const catchAsync = (fn: RequestHandler)=> {  //catching the asynchronous errors 
    return (req: Request, res: Response, next: NextFunction) => {
        Promise.resolve(fn(req, res,next)).catch((err) => next(err))
    };
  };

  export default catchAsync;