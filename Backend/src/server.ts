import express, {Request, Response} from "express"
import authRoute from "./route/auth.route"
import { dbConnect } from "./lib/db";
import cookieParser from "cookie-parser"

const PORT = 4000;
const app = express();

app.use(cookieParser());
app.use(express.json())
app.use("/api", authRoute)

app.listen(PORT, () =>{
    dbConnect();
    console.log("Server listening on 4000")
})