import * as requestRateLimiter from 'request-rate-limiter';

export const requestLimiter = new requestRateLimiter({
  rate: 20,
  interval: 10,
});
