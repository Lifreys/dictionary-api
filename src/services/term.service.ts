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

    async findAll() {
        return await prisma.term.findMany({
            include: {
                category: {
                    select: { id: true, name: true },
                },
            },
        });
    }

    async findById(id: number) {
        return await prisma.term.findUnique({
            where: { id },
            include: {
                category: {
                    select: { id: true, name: true },
                }
            },
        });
    }
}

export const termService = new TermService();
