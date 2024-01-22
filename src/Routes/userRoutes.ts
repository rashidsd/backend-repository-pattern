import express from "express";
import userController from "../controllers/userController";
import Protection from "../middleWares/routesProtection";


const router = express.Router()


router.route("/")
    .post(Protection('Manage Users'),userController.creatUser)
    .get(Protection('Manage Users'),userController.AllUsers)
router.route("/plainUser") 
    .get(userController.plainUser)

router.route("/:id")
    .get(Protection('Manage Users'),userController.findById)
    .put(Protection('Manage Users'),userController.updatUser)
    .delete(Protection('Manage Users'),userController.deleteUser)

router.route("/changePassword")
    .post(userController.changePassword)
export default router 