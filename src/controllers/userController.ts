import { Request, Response } from "express";
import { userService } from "../DIcontainer";
import bcrypt from "bcrypt";


const creatUser = async (req: Request, res: Response) => {
  try {
    const isUserExists = await userService.findByMail(req.body.EMail );
    if (isUserExists) {
      return res.send({
        status: false,
        msg: `${req.body.EMail} already exists `,
      });
    }
    req.body.HashPassword = bcrypt.hashSync(
      req.body.HashPassword,
      Number(process.env.SALT_ROUND)
    );
    const newUser = await userService.create(req.body);
    if (newUser) {
      return res.send({
        status: true,
        msg: "User created successfully",
        data: newUser.toJSON(),
      });
    } else {
      return res.send({ status: false, msg: "user could not be created" });
    }
  } catch (err: any) {
    return res.send({ status: false, msg: err.errors[0].message });
  }
};

const AllUsers = async (req: Request, res: Response) => {
  try {
    const allUser = await userService.all();
    if (allUser) {
      return res.send({ status: true, msg: "OK", data: allUser });
    } else {
      return res.send({ status: false, msg: "No user exists" });
    }
  } catch (err) {
    return res.send({ status: false, msg: err });
  }
};

const findById = async (req: Request, res: Response) => {
  try {
    const user = await userService.findByID(Number(req.params.id));
    if (user) return res.send({ status: true, msg: "OK", data: user });
    else
      return res.send({
        status: true,
        msg: "user does not exists",
      });
  } catch (err) {
    return res.send({ status: false, msg: err });
  }
};

const updatUser = async (req: Request, res: Response) => {
  try {
    const user = await userService.update(
      Number(req.params.id),
      req.body.ERPID,
      req.body.UserName,
      req.body.CustId
    );
    if (user)
      return res.send({
        status: true,
        msg: "user updated successfully",
        data: user,
      });
    else
      return res.send({
        status: false,
        msg: "user cannot be updated",
      });
  } catch (err) {
    return res.send({ status: false, msg: err });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const deleted = await userService.delete(Number(req.params.id));
    if (deleted)
      return res.send({ status: true, msg: "user deleted successfully" });
    else return res.send({ status: false, msg: "user does not exists" });
  } catch (err) {
    return res.send({ status: false, msg: err });
  }
};

const plainUser =async (req:Request,res:Response) => {
  try {
    const response =  await userService.plainUser();
    if (response) {
      return res.send({ status: true, msg: "ok",data:response });
    }else {
      return res.send({ status: false, msg: "no user exists" });
    }
  } catch (err) {
    return res.send({ status: false, msg: err });
  }
}

 const  changePassword = async(req:Request,res:Response)=> {
  try {
    const changed =  await userService.changePassword(req.body);
      if (changed) {
        return res.send({ status: true, msg: "password changed successfully!" });
      }else {
        return res.send({ status: false, msg: "invalid email or passsword" });
      }
  } catch (error) {
    return res.send({ status: false, msg: error });
  }

 }

export default { 
  creatUser, 
  AllUsers, 
  findById, 
  updatUser, 
  deleteUser,
  plainUser,
  changePassword,
 }
