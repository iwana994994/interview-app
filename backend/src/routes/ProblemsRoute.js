import { Router } from "express"
import {ProblemsController} from "../controllers/ProblemController.js"
const route = Router()

route.get("/allProblems",ProblemsController)

export default route