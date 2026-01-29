import { Router } from "express"
import { allProblems } from "../controllers/ProblemController.js";
const route = Router()

route.get("/allProblems",allProblems)

export default route