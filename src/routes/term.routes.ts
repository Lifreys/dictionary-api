import { Router } from "express";
import {
    createTerm, deleteTerm,
    getTermById,
    getTerms, updateTerm
} from "../controllers/term.controller.ts";

const router = Router();

router.post('/', createTerm);
router.get('/', getTerms);
router.get('/:id', getTermById);
router.put('/:id', updateTerm);
router.delete('/:id', deleteTerm);

export default router;
