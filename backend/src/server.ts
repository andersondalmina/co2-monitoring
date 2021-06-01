import "reflect-metadata";
import express from "express";
import routes from "./routes";
import cors from "cors";
import http from "http";
import { Server, Socket } from "socket.io";
import { createConnection } from "typeorm";

// import "./database";
import MeasurementService from "./services/MeasurementService";

interface SensorData {
  sensor: string;
  value: number;
}

createConnection()
  .then(() => {
    const measurementService = new MeasurementService();

    const app = express();

    const server = http.createServer(app);
    const io = new Server(server);

    app.use(cors());
    app.use(express.json());

    app.use("/", routes);

    console.log(process.env.TZ);

    io.on("connection", (socket: Socket) => {
      console.log("a user connected");

      socket.on("data", async ({ sensor, value }: SensorData) => {
        try {
          await measurementService.create(sensor, value);
        } catch (error) {
          console.log(error);
        }
      });
    });

    server.listen(3000, () => {
      console.log("listening on *:3000");
    });
  })
  .catch((error) => console.log(error));
