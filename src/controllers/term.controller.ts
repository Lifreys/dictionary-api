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

export const getTerms = async (req: Request, res: Response) => {
    try {
        const terms = await termService.findAll();
        res.status(200).json(terms);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}

export const getTermById = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);

        if (isNaN(id)) {
            res.status(400).json({ error: 'Invalid ID parameter' });
            return;
        }

        const term = await termService.findById(id);

        if (!term) {
            res.status(404).json({ error: 'Term not found' });
            return;
        }

        res.status(200).json(term);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}
