import { Router } from "express";
import {
    createTerm,
    getTermById,
    getTerms
} from "../controllers/term.controller.ts";

const router = Router();

router.post('/', createTerm);
router.get('/', getTerms);
router.get('/:id', getTermById);

export default router;
