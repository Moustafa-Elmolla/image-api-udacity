import express, {Request, Response } from "express";
import resize from "../../utilities/helper";


const images = express.Router();

images.get('/', resize, (_req: Request, res: Response):void => {
    res.send('filename');
});

export default images;