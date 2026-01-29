import { Router } from "express"
const route = Router()

route.get("/allProblems",ProblemsController)

export default route