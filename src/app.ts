import express from 'express';
import { RegisterRoutes } from './routes/routes';
import { setupSwagger } from './config/Swagger';

const app = express();
const PORT = 3000;

app.use(express.json());

const router = express.Router();
RegisterRoutes(router);

app.use('/', router);

RegisterRoutes(app);
setupSwagger(app);

app.listen(PORT, () => console.log("API online na porta: " + PORT));