import { Router } from "express";  
import {allTransactions,createTransaction} from "../controllers/TransactionsController.js"

const route = Router()

route.post("/create",createTransaction)
route.get("/all",allTransactions)


export default route