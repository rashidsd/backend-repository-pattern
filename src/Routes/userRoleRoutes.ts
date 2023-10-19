import express from 'express'
import userRolesControllers from '../controllers/userRolesControllers'

const router = express.Router()


router.route('/')
    .post(userRolesControllers.assignRole)

router.route('/:id([0-9]+)')
    .delete(userRolesControllers.deleteRole)


export default router