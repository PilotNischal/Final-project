import { Request, Response } from 'express';
import moment, { Moment } from 'moment';
import logger from '../config/logger/logger';
import { AreaModel } from '../Model/Area.model';
import {
  checkAvailabilityService,
  createAreaService,
} from '../Services/Area.service';

export const checkAvailablityController = async (
  req: Request,
  res: Response
) => {
  try {
    const { area_id, startDate, endDate } = req.body;
    const response = await checkAvailabilityService(
      area_id,
      startDate,
      endDate
    );
    res.status(200).send(response);
  } catch (error) {
    logger.error(JSON.stringify(error));
    res.status(400).send('Error');
  }
};
export const createAreaController = async (req: Request, res: Response) => {
  try {
    const { name, description } = req.body;
    const response = await createAreaService(name, description);
    res.status(200).send(response);
  } catch (error) {
    logger.error(JSON.stringify(error));
    res.status(400).send('Error');
  }
};
