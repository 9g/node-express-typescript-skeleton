import { Request, Response, NextFunction, Router } from "express";

/**
 * 익스프레스 라우터 에러 헨들러가 Async function인 경우
 * 핸들러 내부에서 try/catch으로 에러를 잡아주지 않으면 익스프레스 기본 에러 헨들러에서 에러를 잡지 못하기 때문에
 * 아래와 같은 처리로 try/catch를 사용하지 않아도 된다.
 *
 * @param router
 */
export function expressRouterWrapper(router: Router) {
  router.stack.forEach((parentStack) => {
    parentStack.route.stack.forEach((childRoute: any) => {
      const cloneHandler = Object.assign(childRoute.handle, {});

      childRoute.handle = async function (
        request: Request,
        response: Response,
        next: NextFunction
      ) {
        try {
          await cloneHandler(request, response, next);
        } catch (error) {
          next(error);
        }
      };
    });
  });

  return router;
}
