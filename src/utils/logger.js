import logger from 'pino';

const log = logger({
  name: 'template',
  level: 'debug',
  safe: true,
  prettyPrint: { colorize: true, translateTime: 'SYS:standard' },
});

export { log };
