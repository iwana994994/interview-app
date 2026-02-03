import { Router } from "express";
import {createInterview,allInterview,OneInterview} from "../controllers/InterviewController.js"


const router = Router()

router.post("/createInterview",createInterview)
router.get("/allInterview",allInterview)
router.get("/oneInterview",OneInterview)

export default router