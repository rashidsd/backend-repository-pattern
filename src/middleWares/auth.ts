import { DefaultDeserializer } from "v8";
import { authService,roleService } from "../DIcontainer";

import { Request, Response, NextFunction } from "express";

const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    var token = req.cookies.token;
    token = token && token.split(" ")[1];
    if (token) {
      const decoded = authService.verifyToken(
        token,
        process.env.TOKEN_KEY
      );
      if (decoded.user) {
      return next();
      } else {
       return res.status(403).send({ status: false, msg: "Forbidden" });
      }
    } else {
      return res.status(401).send({ status: false, msg: "Unauthorized" });
    }
  } catch (error) {
    return res.status(401).send({ status: false, msg: error });
  }
};
export default auth;
