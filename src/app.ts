/* eslint-disable object-curly-newline */
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Application, NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import globalErrorHandlers from 'middlewares/globalErrorHandler';
import routes from './routes';

const app: Application = express();

app.use(cors());
app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routers
app.use('/api/v1/', routes);

app.get('/', (_req: Request, res: Response) => {
    res.send('Successfully Running App!');
});

// global error handler
app.use(globalErrorHandlers);

// handle not found route
app.use((req: Request, res: Response, next: NextFunction) => {
    res.status(httpStatus.NOT_FOUND).json({
        success: false,
        message: 'Route not found!',
        errorMessages: [
            {
                path: req.originalUrl,
                message: 'API not found!',
            },
        ],
    });

    next();
});

export default app;
