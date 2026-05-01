import express from 'express';
import router from './interfaces/http/routes';
import { env } from './infrastructure/config/env';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './shared/utils/swagger';

const app = express();
app.use(express.json());
app.use('/api', router);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  res.status(400).json({ message: err.message });
});

app.listen(env.port, () => console.log(`Server running on ${env.port}`));
