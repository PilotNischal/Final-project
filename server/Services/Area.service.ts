import { Area, AreaModel } from "../Model/Area.model";
import moment, { Moment } from "moment";
import mongoose from "mongoose";

export async function checkAvailabilityService(
  area_id: string,
  startDate: Moment,
  endDate: Moment
) {
  const area = AreaModel.findOne({
    area_id,
  });
  if (moment(startDate).diff(moment(area.bookedTill), "days") >= 0) {
    return true;
  } else {
    return false;
  }
}

export async function createAreaService(name: string, description: string) {
  try {
    const response = await AreaModel.create({
      name,
      description,
    });
    return "Area created";
  } catch (error) {
    return "Error";
  }
}
