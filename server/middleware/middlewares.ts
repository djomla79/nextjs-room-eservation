import { NextResponse, NextRequest } from 'next/server';

export type NextFunction = () => void;

export type Middleware = (
  request: NextRequest,
  next: NextFunction
) => Promise<NextResponse | void>;

const withMiddlewares =
  (...middleware: Middleware[]) =>
  async (request: NextRequest) => {
    let result;

    for (let i = 0; i < middleware.length; i++) {
      let nextInvoked = false;
      const next = async () => {
        nextInvoked = true;
      };
      result = await middleware[i](request, next);

      if (!nextInvoked) {
        break;
      }
    }

    if (!result) throw new Error('Error occured!');

    return result;
  };

export default withMiddlewares;
