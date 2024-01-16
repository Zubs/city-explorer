// middleware.js
import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from 'cors'

export function setupMiddleware(app) {
  // middleware
  app.use(express.json());
  app.use(cors());
  app.use(morgan("combined")); // 'combined' format includes more details
  app.use(helmet());
}
