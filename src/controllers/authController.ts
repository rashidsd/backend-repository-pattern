
import { Request,Response } from "express";
import { authService,userService,roleService } from "../DIcontainer";
import Utility from "../utilites/dbUtility";


const login = async (req: Request, res: Response) => {
  try {
    
    const authenticate = await authService.login(req.body);
    if (!authenticate)
      return res.send({ status: false, msg: "invalid email or password" });
      const currUser = (await userService.findByMail(req.body.email))?.toJSON();
      const userRoles = await roleService.roleByUserId(currUser.UserID);
      const roles = userRoles.map((r:any)=>r.RoleName)
      
    const token = authService.createToken({
      user: {email:req.body.email,roles:roles}
    },process.env.TOKEN_KEY,{expiresIn:'4h'});

    const refreshToken = authService.createToken({
      user: {email:req.body.email,roles:roles}
    },process.env.REFRESH_TOKEN_KEY,{expiresIn:'24h'});
   
    res.cookie("token", `bearer ${token}`, { httpOnly: true });
    res.cookie("refreshToken", `${refreshToken}`, { httpOnly: true });
        const result = await Utility.exeQuery("Select Company_Name as name,Company_logo as logo from Company")
    const companyInfo = Object.values(result[0])
    const b64 = Buffer.from(companyInfo[1]).toString('base64');
    const logo = `data:image/jpeg;base64,${b64}`
    return res.send({
      status: true,
      msg: "ok",
      data: {
        user: { name: currUser.UserName, email: currUser.EMail,erpId:currUser.ERPID,custId:currUser.custId },
        roles: userRoles,
        company:{name:companyInfo[0],logo:logo}
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
            user: { email: decoded.user.email,roles:decoded.user.roles },
          },
          process.env.TOKEN_KEY,
          { expiresIn: "4h" }
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
