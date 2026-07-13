import express, { Request, Response } from "express";
import categoryRoutes from "./routes/category.routes.ts";

const app = express();

app.use(express.json());
app.use('/categories', categoryRoutes);

app.get('/', (req: Request, res: Response) => {
    res.json({ message: 'Welcome to Dictionary API'})
});

export default app;
