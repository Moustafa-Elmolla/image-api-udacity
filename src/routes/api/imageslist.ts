import express, { Request, Response } from 'express';
import { imagesNames } from '../../constants';

const imagesList = express.Router();

imagesList.get('/', (_req: Request, res: Response): void => {
    res.send(`${imagesNames.toString()}`);
});

export default imagesList;
