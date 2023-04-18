import express, { Router } from "express";
import {
  checkAvailablityController,
  createAreaController,
} from "../Controllers/Area.controller";

const router = Router();

router.post("/", createAreaController);
router.post("/checkavailable", checkAvailablityController);

export default router;
