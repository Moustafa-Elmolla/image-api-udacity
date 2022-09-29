import express, { Request, Response } from 'express';
import processImage from '../../utilities/helper';

const images = express.Router();

images.get('/', processImage, (_req: Request, res: Response) => {
    res.send('filename');
});

export default images;
