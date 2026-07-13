import {Request, Response} from "express";
import {categorySevice} from "../services/category.service.ts";

export const createCategory = async (req: Request, res: Response) => {
    try {
        const { name } = req.body;

        if (!name) {
            res.status(400).json({ error: 'Name field is required' });
            return;
        }

        const newCategory = await categorySevice.create(name);

        res.status(201).json(newCategory);
    } catch (error: any) {
        if (error.code === 'P2002') {
            res.status(400).json({error: 'Category with this name already exists'});
            return;
        }
    }

    res.status(500).json({error: 'Internal Server Error'});
}
