import carRoutes from "./Routes/Car.routes";

import express, { Request, Response, NextFunction } from "express";
import helmet, { xssFilter } from "helmet";
import userRoutes from "./Routes/User.routes";
import adminRoutes from "./Routes/Admin.routes";
import areaRoutes from "./Routes/Area.routes";
import hotelRoutes from "./Routes/Hotel.routes";
import roomRoutes from "./Routes/Room.routes";
import reviewRoutes from "./Routes/Review.routes";
import { authenticateToken } from "./middlewares/Authentication";
import db from "./config/Database/database";
import cors from "cors";
import { BookingModel } from "./Model/Booking.model";
import { CarBookingModel } from "./Model/CarBooking.model";

const app = express();

app.use(xssFilter());
app.use(helmet({ crossOriginResourcePolicy: false }));
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);
app.use(express.urlencoded({ extended: true }));
db();

//health check
app.get("/ping", authenticateToken, (req: Request, res: Response) => {
  res.send("OK").status(200);
});

// app.use((req: Request, res: Response, next: NextFunction) => {
//   console.info(
//     `Incoming-> Method: [ ${req.method}] url:[${req.url}] IP: [${req.socket.remoteAddress}]`
//   );

//   res.on("finish", () => {
//     console.info(
//       `Incoming-> Method: [ ${req.method}] url:[${req.url}] IP: [${req.socket.remoteAddress}]  status:[${res.status}]`
//     );
//   });
//   next();
// });
process.once("SIGUSR2", function () {
  process.kill(process.pid, "SIGUSR2");
});

process.on("SIGINT", function () {
  // this is only called on ctrl+c, not restart
  process.kill(process.pid, "SIGINT");
});

app.use("/api/v1/image/hotel", express.static("Assets/Hotel"));
app.use("/api/v1/image/user", express.static("Assets/User"));
app.use("/api/v1/image/car", express.static("Assets/Car"));
app.use("/api/v1/car", carRoutes);
app.get("/api/v1/bookinglist", async (req, res) => {
  try {
    const hotelBooking = await BookingModel.find();
    const carBooking = await CarBookingModel.find();
    const cancelled = carBooking.filter((item) => !item.status);
    res.status(200).send({
      hotelBooking,
      carBooking,
      cancelled,
    });
  } catch (error) {
    res.status(400).send(error);
  }
});
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/area", areaRoutes);
app.use("/api/v1/hotel", hotelRoutes);
app.use("/api/v1/room", roomRoutes);
app.use("/api/v1/review", reviewRoutes);

app.listen(9000);
