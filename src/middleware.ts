import { Request, Response, NextFunction } from 'express'

export const middleware = (req: Request, res: Response, next: NextFunction) => {
  const headers = req.headers.authorization

  if (!headers) {
    return res.status(401).json({
      status: 401,
      message: 'Unauthorized',
    })
  }

  next()
}
