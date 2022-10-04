import express, { Request, response, Response } from 'express';
import sharp from 'sharp';
import path from 'path';
import fs from 'fs';
import { imagesNames } from '../../constants';

// const reqPath = path.join(__dirname, '../../');
const images = express.Router();

const imagePath: string = path.resolve('./') + '/assets/thumbnail';
// console.log('imagePath', imagePath);
const orgimages: string = path.resolve('./') + '/assets/images';
// console.log('orgimages', orgimages);
images.get(
    '/',
    async (req: Request, res: Response): Promise<void | unknown> => {
        const filename = req.query.filename as string;
        const width = parseInt(req.query.width as string);
        const height = parseInt(req.query.height as string);
        const image = imagesNames;

        if (image != imagesNames) {
            return res.status(400).send(`image not exist`);
        }
        try {
            if (
                !fs.existsSync(
                    imagePath + '/' + filename + '-' + width + '-' + '.jpg'
                )
            ) {
                await resizeImage(filename, width, height);

                const resizedImage = `${imagePath}/${filename}-${width}-${height}.jpg`;
                res.sendFile(resizedImage);
            } else {
                const resizedImage = `${imagePath}/${filename}-${width}-${height}.jpg`;
                res.status(200).sendFile(resizedImage);
            }
        } catch (error) {
            res.status(400);
            res.send(error);
        }
    }
);

async function resizeImage(
    filename: string,
    width: number,
    height: number
): Promise<string | undefined> {
    const input = path.join(`${orgimages}`, `${filename}.jpg`);
    const output = path.join(
        `${imagePath}`,
        `${filename}-${width}-${height}.jpg`
    );
    try {
        await sharp(input).resize(width, height).toFile(output);
        return;
    } catch (error) {
        response.send(error + 'somthing wrong');
    }
}
export default images;
