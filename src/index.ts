import express, { Application } from 'express';
import routes from './routes/index';
// import morgan from 'morgan';
// import errorMiddleware from './middleware/error.middleware';
// import logger from './utilities/logger';

const PORT = process.env.PORT || 3000;
//create server
const app: Application = express();

//HTTP request logger middleware
// app.use(morgan('dev'));

// app.get('/api', (req, res) => {
//     res.send('Hello, from API page');
// });

//add route

// Handeling Error
// app.use(errorMiddleware);

app.use('/api', routes);

//routes
// app.get('/', logger, (_req, res) => {
//     res.send('/images');
// });
// app.get('/', logger, (_req, res) => {
//     res.send('/imageslist');
// });

//start express server
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});

export default app;
