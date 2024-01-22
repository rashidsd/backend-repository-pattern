import express from 'express'
import userRolesControllers from '../controllers/userRolesControllers'

const router = express.Router()


router.route('/getRoles/:id')
    .get(userRolesControllers.assignUserRoles)

router.route('/updateRoles')
.post(userRolesControllers.updateUserRoles)

router.route('/:id([0-9]+)')
    .delete(userRolesControllers.deleteRole)


export default router