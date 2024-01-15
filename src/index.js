import express from 'express';
import router from './apiRoutes';
import { setupMiddleware } from './middleware';

const PORT = 8000;
const app = express();

setupMiddleware(app);

app.use('/api', router);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// At the end of src/index.js
export default app;

