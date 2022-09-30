import { Router, Request, Response } from 'express';
import imagesList from './api/imageslist';
import images from './api/images';

const routes = Router();

routes.get('/', (_req: Request, res: Response): void => {
    res.send('main api route');
});

routes.use('/images', images);
routes.use('/imageslist', imagesList);

export default routes;
