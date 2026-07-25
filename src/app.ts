import express, { Request, Response } from "express";
import categoryRoutes from "./routes/category.routes.ts";
import termRoutes from "./routes/term.routes.ts";

const app = express();

app.use(express.json());
app.use('/categories', categoryRoutes);
app.use('/terms', termRoutes);

app.get('/', (req: Request, res: Response) => {
    res.json({ message: 'Welcome to Dictionary API'})
});

app.use((req: Request, res: Response) => {
    res.status(404).json({ error: 'Page not found' });
});

export default app;
