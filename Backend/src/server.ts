import express, {Request, Response} from "express"
import authRoute from "./route/auth.route"
import usersRoute from "./route/user.route"
import { dbConnect } from "./lib/db";
import cookieParser from "cookie-parser"
import cors from "cors"

const PORT = 4000;
const app = express();

app.use(cookieParser());
app.use(express.json())
app.use(cors());

app.use("/api/auth", authRoute)
app.use("/api/users", usersRoute)

app.listen(PORT, () =>{
    dbConnect();
    console.log("Server listening on 4000")
})