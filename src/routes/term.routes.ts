import { Router } from "express";
import { createTerm } from "../controllers/term.controller.ts";

const router = Router();

router.post('/', createTerm);

export default router;
