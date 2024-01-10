// middleware.js
import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';

export function setupMiddleware(app) {
  // Apply middleware
//   app.use(express.json());
//   app.use(morgan('combined'));
//   app.use(helmet());

  // Custom middleware for logging
  app.use((req, res, next) => {
    const start = Date.now();
    next();
    const end = Date.now();
    console.log(`${req.method} ${req.url} took ${end - start} ms`);
  });
}
