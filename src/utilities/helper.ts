import { Request, Response } from 'express';
import sharp from 'sharp';
import path from 'path';
import fs from 'fs';

const processImage = async (req: Request, res: Response) => {
    const filename = req.query.filename;
    const width = parseInt(req.query.width as string);
    const height = parseInt(req.query.height as string);
    const newPath = __dirname + '../../assets/thumbnail/';
    // console.log('here is newPath', newPath);

    const imagePath: string = path.normalize(
        newPath + filename + '-' + width + '-' + height + '.jpg'
    );
    const orgPath = __dirname + '../../assets/images/';
    // console.log('here is imagePath !!!', imagePath);
    const orgimages: string = path.normalize(orgPath + filename);

    if (!fs.existsSync(orgimages)) {
        res.status(400).send('Input file Missing');
        return;
    }
    if (fs.existsSync(imagePath)) {
        return res.status(200).sendFile(imagePath);
    } else {
        if (filename != null) {
            resizeImage(
                filename as string,
                width as unknown as number,
                height as unknown as number
            );
            await setTimeout(() => {
                return res.status(200).sendFile(imagePath);
            }, 1000);
        }
    }
};
async function resizeImage(filename: string, width: number, height: number) {
    // console.log('resizeImage value', filename);
    const input = './assets/images/' + filename;
    const output = './assets/thumbnail/' + filename;
    try {
        await sharp(input)
            .resize(width, height)
            .toFile(output + '-' + width + '-' + height + '-' + '.jpg');
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
