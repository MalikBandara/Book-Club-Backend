import { Request, Response, NextFunction } from "express";
import jwt, {
  JwtPayload,
  TokenExpiredError,
  JsonWebTokenError,
} from "jsonwebtoken";
import { ApiError } from "../errors/apiError";

// Middleware to authenticate JWT access token
export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1]; // Expect "Bearer TOKEN"

    if (!token) {
      return next(new ApiError(401, "Access token missing"));
    }

    jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET as string,
      (err, decoded) => {
        if (err) {
          if (err instanceof TokenExpiredError) {
            return next(new ApiError(401, "Access token expired"));
          } else if (err instanceof JsonWebTokenError) {
            return next(new ApiError(401, "Invalid access token"));
          } else {
            return next(new ApiError(401, "Could not authenticate token"));
          }
        }

        if (!decoded || typeof decoded === "string") {
          return next(new ApiError(401, "Invalid token payload"));
        }

        // Attach user info (e.g. userId) to request object for downstream handlers
        // we don't need this for this app

        next();
      }
    );
  } catch (err) {
    next(err);
  }
};
