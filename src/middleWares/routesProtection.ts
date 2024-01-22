import { Request,Response,NextFunction} from "express";
import { authService } from "../DIcontainer";


const roleProtection = (role: string) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    var token = req.cookies.token;
    token = token && token.split(" ")[1];
    if (token) {
      const decoded:any = await authService.verifyToken(
        token,
        process.env.TOKEN_KEY
      );
      if (decoded && decoded.user && decoded.user.roles && decoded.user.roles.includes(role))
          return next();
      else return res.status(422).send({ status: false, msg: "Access denied" });
    }else {
      return res.status(401).send({ status: false, msg: "Unauthorized" });
    }
  };
};

export default roleProtection;