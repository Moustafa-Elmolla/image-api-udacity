import express, {Request, Response } from "express";
import {ImagesNames} from '../../constants'

const ImagesList = express.Router();

ImagesList.get('/', (_req: Request, res: Response):void => {
    res.send(`${ImagesNames.toString()}`);
});

export default ImagesList;