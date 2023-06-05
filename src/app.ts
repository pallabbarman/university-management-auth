import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import globalErrorHandlers from 'middlewares/globalErrorHandler';
import usersRouter from 'routes/user.routes';

const app: Application = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routers
app.use('/api/v1/users/', usersRouter);

app.get('/', (req: Request, res: Response) => {
    res.send('Successfully Running App!');
});

// global error handler
app.use(globalErrorHandlers);

export default app;
