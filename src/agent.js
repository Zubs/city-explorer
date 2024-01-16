// agent.js
import https from 'https';
import config from './config.js';

const agent = new https.Agent({
  rejectUnauthorized: config.NODE_ENV === 'production',
});

export default agent;
