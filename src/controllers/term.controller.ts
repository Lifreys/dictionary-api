import { Request, Response } from 'express';
import {termService} from "../services/term.service.ts";

export const createTerm = async (req: Request, res: Response) => {
    try {
        const { name, definition, categoryId } = req.body;

        if (!name || !definition || !categoryId) {
            res.status(400).json({
                error: 'Fields name, definition and categoryId are required',
            });
            return;
        }

        const parsedCategoryId = Number(categoryId);
        if (isNaN(parsedCategoryId)) {
            res.status(400).json({
                error: 'categoryId must be a number',
            });
            return;
        }

        const newTerm = await termService.create(name, definition, categoryId);

        res.status(201).json(newTerm);
    } catch (error: any) {
        if (error.code === 'P2003') {
            res.status(400).json({ error: 'Category with the provided categoryId does not exist' });
            return;
        }

        if (error.code === 'P2002') {
            res.status(400).json({ error: 'Term with this name already exists' });
            return;
        }

        res.status(500).json({ error: 'Internal server error' });
    }
}
