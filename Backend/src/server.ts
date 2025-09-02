import express, {Request, Response} from "express"
import { Server } from "socket.io";
import http from "http"
import authRoute from "./route/auth.route"
import usersRoute from "./route/user.route"
import messageRoute from "./route/message.route"
import { dbConnect } from "./lib/db";
import cookieParser from "cookie-parser"
// import cors from "cors"
import path from "path";



const PORT = 4000;
const app = express();

const server = http.createServer(app);

const io = new Server(server,{
    cors : {
        origin : ["http://localhost:5173"],
        methods : ["GET", "POST"],
        credentials: true,
    }
});

const userSocketMap : Record<string, string> = {};

export const getReceiverSocketId = (receiverId : string) =>{
    return userSocketMap[receiverId];
}

app.use(cookieParser());
app.use(express.json())
// app.use(cors({
//     origin: "http://localhost:5173", // frontend URL
//     credentials: true,               // allow cookies
// }));

app.use(express.static(path.join(__dirname, "../../Frontend/dist")));

app.use("/api/auth", authRoute)
app.use("/api/users", usersRoute)
app.use("/api/message", messageRoute)

app.get("*", (req : Request, res : Response)=>{
    res.sendFile(path.join(__dirname, "../../Frontend/dist", "index.html"));
})

io.on("connection", (socket) =>{
    console.log("a user is connected", socket.id);

    const userId = socket.handshake.query.userId as string;

    if(userId !== "undefined")
    {
        userSocketMap[userId] = socket.id;
    }

    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    socket.on("disconnect", () => {
        console.log("user connected", socket.id);
        delete userSocketMap[userId];
        io.emit("getOnlineUsers", Object.keys(userSocketMap))
    })
})

export {io};

server.listen(PORT, () =>{
    dbConnect();
    console.log("Server listening on 4000")
})