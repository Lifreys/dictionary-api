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
            res.status(400).json({ error: 'Category with this name already exists' });
            return;
        }
    }

    res.status(500).json({ error: 'Internal Server Error' });
};

export const getCategories = async (req: Request, res: Response) => {
    try {
        const categories = await categorySevice.findAll();
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const getCategoryById = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);

        if (isNaN(id)) {
            res.status(400).json({ error: 'Invalid ID parameter' });
            return;
        }

        const category = await categorySevice.findById(id);

        if (!category) {
            res.status(404).json({ error: 'Category not found' });
            return;
        }

        res.status(200).json(category);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const updateCategory = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const { name } = req.body;

        if (isNaN(id)) {
            res.status(400).json({ error: 'Invalid ID parameter' });
            return;
        }

        if (!name) {
            res.status(400).json({ error: 'Name field is required' });
            return;
        }

        const updatedCategory = await categorySevice.update(id, name);
        res.status(200).json(updatedCategory);
    } catch (error: any) {
        if (error.code === 'P2025') {
            res.status(404).json({ error: 'Category not found' });
        }

        if (error.code === 'P2002') {
            res.status(400).json({ error: 'Category with this name already exists' });
            return;
        }

        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const deleteCategory = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);

        if (isNaN(id)) {
            res.status(400).json({ error: 'Invalid ID parameter' });
            return;
        }

        await categorySevice.delete(id);

        res.status(204).send();
    } catch (error: any) {
        if (error.code === 'P2025') {
            res.status(404).json({ error: 'Category not found' });
            return;
        }
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

