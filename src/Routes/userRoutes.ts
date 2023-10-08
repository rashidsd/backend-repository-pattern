import express from "express";
import userController from "../controllers/userController";


const router = express.Router()


router.route("/")
    .post(userController.creatUser)
    .get(userController.AllUsers)

router.route("/:id")
    .get(userController.findById)
    .put(userController.updatUser)
    .delete(userController.deleteUser)





export default router 