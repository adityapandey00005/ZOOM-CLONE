import express from 'express';
import { createServer } from 'node:http';


import { Server } from 'socket.io';

import mongoose from 'mongoose';
import { connectToSocket } from "./controllers/socketManager.js";


import cors from 'cors';
import userRoutes from './routes/user.routes.js';

const app = express();
const httpServer = createServer(app);
const io = connectToSocket(httpServer)


app.set("port", (process.env.PORT || 8000))

app.use(cors());
app.use(express.json({limit: "40kb"}));
app.use(express.urlencoded({ limit: "40kb", extended: true }));
app.use("/api/v1/users", userRoutes);


const start = async () => {
    const connectionDb = await mongoose.connect("mongodb+srv://harshpandey1924:eJeTSFY0Rq8ut5o7@cluster0.vwdskxu.mongodb.net/");
    console.log(`MONGO ConnectedDb HHost: ${connectionDb.connection.host}`)

    httpServer.listen(app.get("port"), () => {
        console.log("Server is running on port 8000");
    });
}
start();