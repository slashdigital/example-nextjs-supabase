const pino = require('pino');

console.log(pino, pino.transport);

export const logger = pino();

