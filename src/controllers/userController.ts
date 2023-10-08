import { Request, Response } from "express";
import { userService } from "../DIcontainer";
import bcrypt from "bcrypt";
import User from "../Models/User";

const creatUser = async (req: Request, res: Response) => {
  try {
    const isUserExists = await User.findOne({
      where: { Email: req.body.EMail },
    });
    if (isUserExists) {
      return res.send({
        status: false,
        statusCode: 200,
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
    const allUser = await userService.All();
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
      req.body.UserName
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

export default { creatUser, AllUsers, findById, updatUser, deleteUser };
