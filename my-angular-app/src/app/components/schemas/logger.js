const sourceToken = process.env.BETTERSTACK_SOURCE_TOKEN;

import { createLogger, format, transports } from 'winston';

// Create a logger instance
const logger = createLogger({
  level: 'info',
  format: format.combine(format.timestamp(), format.json()),
  transports: [new transports.Console()],
});

export default logger;
