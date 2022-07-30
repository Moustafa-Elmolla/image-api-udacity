import express, { Application } from 'express';
import routes from './routes/index';
import morgan from 'morgan';
import errorMiddleware from './middleware/error.middleware';
// import logger from './utilities/logger';


const port = 3000;
//create server
const app: Application = express();

//HTTP request logger middleware
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));

app.get('/', (req, res) => {
    res.end("Morgan Logger App");
})

//add route 
app.use('/api', routes);

//routes
// app.get('/', logger, (_req, res) => {
//     res.send('/images')
// })
// app.get('/', logger, (_req, res) => {
//     res.send('/imageslist')
// })

// Handeling Error
app.use(errorMiddleware);

//start express server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

export default app;