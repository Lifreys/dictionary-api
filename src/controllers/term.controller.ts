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
        const { search, categoryId } = req.query;

        let parsedCategoryId: number | undefined;
        if (categoryId) {
            parsedCategoryId = Number(categoryId);
            if (isNaN(parsedCategoryId)) {
                res.status(400).json({ error: 'categoryId parameter must be a number' });
                return;
            }
        }

        const terms = await termService.findAll({
            search: search ? String(search) : undefined,
            categoryId: parsedCategoryId,
        });

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

export const updateTerm = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        if (isNaN(id)) {
            res.status(400).json({ error: 'Invalid ID parameter' });
            return;
        }

        const { name, definition, categoryId } = req.body;

        let parsedCategoryId: number | undefined;
        if (categoryId !== undefined) {
            parsedCategoryId = Number(categoryId);
            if (isNaN(parsedCategoryId)) {
                res.status(400).json({ error: 'categoryId must be a number' });
                return;
            }
        }

        const updatedTerm = await termService.update(id, {
            name,
            definition,
            categoryId: parsedCategoryId,
        });

        res.status(200).json(updatedTerm);
    } catch (error: any) {
        if (error.code === 'P2025') {
            res.status(404).json({ error: 'Term not found' });
            return;
        }
        if (error.code === 'P2003') {
            res.status(400).json({ error: 'Category with provided categoryId does not exist' });
            return;
        }
        if (error.code === 'P2002') {
            res.status(400).json({ error: 'Term with this name already exists' });
            return;
        }
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const deleteTerm = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        if (isNaN(id)) {
            res.status(400).json({ error: 'Invalid ID parameter' });
            return;
        }

        await termService.delete(id);

        res.status(204).send();
    } catch (error: any) {
        if (error.code === 'P2025') {
            res.status(404).json({ error: 'Term not found' });
            return;
        }
        res.status(500).json({ error: 'Internal server error' });
    }
};
