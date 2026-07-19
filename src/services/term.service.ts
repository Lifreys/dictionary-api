import { prisma } from "../db/prisma.ts";

class TermService {
    async create(name: string, definition: string, categoryId: number) {
        return await prisma.term.create({
            data: {
                name,
                definition,
                categoryId,
            },
        });
    }
}

export const termService = new TermService();
