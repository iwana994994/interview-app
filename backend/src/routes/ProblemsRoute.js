import { Router } from "express"
import ProblemsController from "../controllers/ProblemController"
const route = Router()

route.get("/allProblems",ProblemsController)

export default route