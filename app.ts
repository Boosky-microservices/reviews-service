import express, {Request, Response} from 'express';
import Logger from './config/logger.config';
import swagger from './config/swagger.config';
import methodOverride from 'method-override';
import { buildConnection } from './config/database.config';
import { loadEnvVariables } from './config/dotenv.config';
import bodyParser from 'body-parser';
import cors from 'cors';
import {APIGatewayProxyHandler} from 'aws-lambda';
import serverless from 'serverless-http';

// Load environement variables
loadEnvVariables();

// Create a new express application instance
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(cors());
import routes from './routes/app.routes';

app.use('/health', (req, res) => res.send('ok'));
app.use('/api/v1/', routes);
app.use('/api-docs', swagger);

const PORT = process.env.PORT || 3001;

buildConnection()
    .then(() => {
        Logger.info('Connection to DB Established');
        app.listen(PORT, () => {
            Logger.info('Boosky reviews service listening on http://localhost:' + PORT);
        });
    })
    .catch(err => {
        Logger.error('Error on start: ' + err.stack);
        process.exit(1);
    });

app.get('/message', (req: Request, res: Response) => {
    res.send({message: 'This is message route'});
});
app.use((req: Request, res: Response) => {
    res.send({message: 'Server is running'});
});

export const handler: APIGatewayProxyHandler = serverless(app);
