import express from "express"
import { receptionistSignup, receptionistLogin,singleReceptionistData,allReceptionistData,deleteReceptionist,updateReceptionist} from "../controllers/Reception_controller.js"
import {middleWare, isDoctor, isDean} from "../middlewares/auth.verifyMiddleWare.js"
import { receptionistSignupValidation, receptionistLoginValidation, validationErrors } from "../middlewares/validation.js"

const routes = express.Router()

routes.post('/signup',isDoctor,receptionistSignupValidation(),validationErrors,receptionistSignup)
routes.post('/login',receptionistLoginValidation(),validationErrors,receptionistLogin)
routes.get('/:referenceNo',isDoctor,singleReceptionistData)
routes.get('/',isDoctor, allReceptionistData );
routes.delete('/:referenceNo',isDoctor,deleteReceptionist)
routes.patch('/:referenceNo',isDoctor,updateReceptionist)

export default routes