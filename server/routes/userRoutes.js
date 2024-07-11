
import express from 'express'
import { createUser} from '../controllers/userController.js'



const routeUser = express.Router()


routeUser.post('/', createUser)




export default routeUser