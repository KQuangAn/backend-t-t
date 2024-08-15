import { app } from './app';
import { config } from './config';
import { logger } from './utils/logger';

if (process.env.NODE_ENV !== 'test') {
    app.listen(config.port, () => {
        logger.info(`Server is running on port ${config.port}`);
    });
}