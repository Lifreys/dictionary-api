import { prisma } from "../db/prisma.ts";

interface FindAllParams {
    search?: string;
    categoryId?: number;
}

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

    async findAll(params: FindAllParams = {}) {
        const { search, categoryId } = params;

        return await prisma.term.findMany({
            where: {
                ...(categoryId ? { categoryId } : {}),
                ...(search ?
                    {
                        OR: [
                            { name: { contains: search, mode: 'insensitive' } },
                            { definition: { contains: search, mode: 'insensitive' } },
                        ],
                    }
                    : {}),
            },
            include: {
                category: {
                    select: { id: true, name: true },
                },
            },
            orderBy: {
                createdAt: 'desc',
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

    async update(id: number, data: { name?: string; definition?: string; categoryId?: number }) {
        return await prisma.term.update({
            where: { id },
            data,
            include: {
                category: {
                    select: { id: true, name: true },
                },
            },
        });
    }

    async delete(id: number) {
        return await prisma.term.delete({
            where: { id },
        });
    }
}

export const termService = new TermService();
