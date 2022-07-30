import express, { Request, Response } from 'express';
import sharp from 'sharp';
import path from 'path';


const resize = async (req: Request, res: Response) => {
    const imageName = req.query.filename;
    const imageWidth:number = Number(req.query.width);
    const imageHeight:number = Number(req.query.height);
    const imagePath:string = path.normalize(
        __dirname + '../../thumbnail/' + imageName + '-' + imageWidth + '-' + imageHeight + '.jpg')
    console.log("here is imagePath !!!",imagePath)

    console.log("resize !!!",imageName)

        if (imageName !== null) {
    resizeImage(imageName as string, imageWidth as unknown as number, imageHeight as unknown as number)
    setTimeout(() => {
            return res.status(200).sendFile(imagePath);
        }, 1000)
}
}

async function resizeImage(imageName: string, imageWidth: number, imageHeight: number) {
    console.log("resizeImages value",imageName)
    try {
        await sharp('./images/' + imageName)
        .resize(imageWidth, imageHeight)
        .toFile('./src/thumbnail/' + imageName + '-' + imageWidth + '-' + imageHeight + '-' + '.jpg')
    } catch (error) {
        console.log(error);
    };
};

export {resizeImage};
export default resize;
