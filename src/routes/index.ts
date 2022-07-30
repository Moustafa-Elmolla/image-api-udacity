import express, {Request, Response } from "express";
import ImagesList from './api/imageslist'
import images from './api/images'


const routes = express.Router();

routes.get('/', (_req: Request, res: Response):void => {
    res.status(200).send('main api route');
});

routes.use('/images', images)
routes.use('/imageslist', ImagesList);

export default routes;