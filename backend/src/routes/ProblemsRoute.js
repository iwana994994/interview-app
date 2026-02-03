import { Router } from "express"
import { allProblems, ProblemOne,CreateProblem } from "../controllers/ProblemController.js";
const route = Router()

route.get("/all",allProblems)
route.get("/all/:id",ProblemOne)
route.post("/createProblem",CreateProblem)

export default route