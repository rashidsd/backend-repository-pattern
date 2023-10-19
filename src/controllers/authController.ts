
import { Request,Response } from "express";
import { authService,userService,roleService } from "../DIcontainer";


const login = async (req: Request, res: Response) => {
  try {
    const authenticate = await authService.login(req.body);
    if (!authenticate)
      return res.send({ status: false, msg: "invalid email or password" });
    const token = authService.createToken({
      user: {email:req.body.email}
    },process.env.TOKEN_KEY,{expiresIn:'10s'});

    const refreshToken = authService.createToken({
      user: {email:req.body.email}
    },process.env.REFRESH_TOKEN_KEY,{expiresIn:'24h'});
   
    
    res.cookie("token", `bearer ${token}`, { httpOnly: true });
    res.cookie("refreshToken", `${refreshToken}`, { httpOnly: true });
    const currUser = (await userService.findByMail(req.body.email))?.toJSON();
    const userRoles = await roleService.roleByUserId(currUser.UserID);
    return res.send({
      status: true,
      msg: "ok",
      data: {
        user: { name: currUser.UserName, email: currUser.EMail },
        roles: userRoles,
      },
    });
  } catch (error) {
    return res.send({ status: false, msg: error });
  }
};

const logout = async (req: Request, res: Response) => {
  try {
    res.cookie("token", "", { expires: new Date(Date.now() - 60 * 1000) });
    res.cookie("refreshToken", "", {
      expires: new Date(Date.now() - 60 * 1000),
    });
    return res.send({ status: true, msg: "Ok" });
  } catch (error) {
    return res.send({ status: false, msg: error });
  }
};

const refreshTheToken = (req: Request, res: Response) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (refreshToken) {
      const decoded = authService.verifyToken(
        refreshToken,
        process.env.REFRESH_TOKEN_KEY
      );
      if (decoded.user) {
        const token = authService.createToken(
          {
            user: { email: req.body.email },
          },
          process.env.TOKEN_KEY,
          { expiresIn: "10s" }
        );
        res.cookie("token", `bearer ${token}`, { httpOnly: true });
        return res.send({ status: true, msg: "token refreshed" });
      } else {
        return res.send({ status: false, msg: "Unauthorized" });
      }
    }else {
      return res.send({ status: false, msg: "Unauthorized" });
    }
  } catch (error) {
   return res.send({ status: false, msg: error });
  }
};


export default {
    login,
    logout,
    refreshTheToken
    
}
