import express from "express";
import roleGroupController from "../controllers/roleGroupController";

const router =  express.Router()


router.route('/')
.get(roleGroupController.allRoleGroup)
.post(roleGroupController.createRoleGroup)

router.route('/:id([0-9]+)')
.delete(roleGroupController.deletRoleGroup)
.put(roleGroupController.updateRoleGroup)
.get(roleGroupController.finByIdRoleGroup)


export default router