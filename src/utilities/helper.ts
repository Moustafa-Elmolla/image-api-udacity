import { Request, Response } from 'express';
import sharp from 'sharp';
import path from 'path';
import fs from 'fs';
import { imagesNames } from '../constants';

// const reqPath = path.join(__dirname, '../../');

const processImage = async (req: Request, res: Response) => {
    const filename = req.query.filename as string;
    const width = parseInt(req.query.width as string);
    const height = parseInt(req.query.height as string);
    const imageName = imagesNames.includes(filename);
    const newPath = path.join(__dirname, '../../assets/thumbnail/');

    // console.log('here is reqPath', reqPath);
    console.log('here is newPath', newPath);

    const imagePath: string = path.normalize(
        newPath + filename + '-' + width + '-' + height + '.jpg'
    );
    console.log('here is imagePath', imagePath);
    const orgPath = path.join(__dirname, '../../assets/images/');
    console.log('here is orgPath', orgPath);

    const orgimages: string = path.normalize(orgPath + filename);
    console.log('here is orgimages !!!', orgimages);

    if (imageName === false) {
        return res
            .status(404)
            .send('Image not found, This image does not exist.');
    }

    if (!fs.existsSync(orgimages)) {
        return res.status(400).send('Input file Missing');
    }
    if (fs.existsSync(imagePath)) {
        res.status(200).sendFile(imagePath);
    } else {
        if (filename != null) {
            resizeImage(
                filename as string,
                width as unknown as number,
                height as unknown as number
            );
        }
    }
};
async function resizeImage(
    filename: string,
    width: number,
    height: number
): Promise<string | undefined> {
    const input = './assets/images/' + filename;
    const output = './assets/thumbnail/' + filename;
    try {
        await sharp(input)
            .resize(width, height)
            .toFile(output + '-' + width + '-' + height + '-' + '.jpg');
        return;
    } catch (error) {
        console.log(error);
    }
}

export { resizeImage };
export default processImage;

// const imagePath = '/images/';

// const processImage = async (req: Request, res: Response) => {
//     const filename = req.query.filename;
//     const width = Number(req.query.width);
//     const height = Number(req.query.height);

//     const inputDir = imagePath + filename + '.jpg';
//     const outputDir =
//         imagePath + 'cache/' + filename + '_' + width + '_' + height + '.jpg';

//     if (fs.existsSync(outputDir)) {
//         res.sendFile(outputDir, { root: './' });
//         return;
//     }
//     if (!fs.existsSync(inputDir)) {
//         res.status(404).send(`Input file ${filename} Missing`);
//         return;
//     }
// };
// const resize = async (
//     filename: string,
//     width: number,
//     height: number,
//     outdir: string
// ): Promise<boolean> => {
//     try {
//         await sharp(filename)
//             .resize({ width: Number(width), height: Number(height) })
//             .toFile(outdir)
//             .then(() => {
//                 console.log('image resized');
//             });
//         return true;
//     } catch (error) {
//         console.log(error);
//         return false;
//     }
// };

// export default { resize, processImage };
