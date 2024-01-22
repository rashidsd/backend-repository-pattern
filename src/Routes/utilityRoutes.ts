import express from 'express'
import utilityController from '../controllers/utilityController'

const router  = express.Router()


router.get ("/:descr",utilityController.getResult)


export default router