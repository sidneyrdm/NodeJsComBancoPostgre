import exp from 'constants';
import express, {Request, Response, NextFunction} from 'express';
import errorHandler from './middlewares/error-handler.middleware';
import statusRoute from './routes/status.route';
import usersRoute from './routes/users.route';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(usersRoute);
app.use(statusRoute);

app.use(errorHandler);


app.get('/status', (request: Request, response: Response, next: NextFunction) => {
    response.status(200).send('Olá mundão!!!');
})

app.listen(3000, () => {
    console.log('Aplicação exdcutando na porta 3000');
});