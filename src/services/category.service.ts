import { prisma} from '../db/prisma';

class CategoryService {
    async create(name: string) {
        return await prisma.category.create({
            data: { name },
        });
    }

    async findAll() {
        return await prisma.category.findMany();
    }

    async findById(id: number) {
        return await prisma.category.findUnique({
            where: { id },
        });
    }
}

export const categorySevice = new CategoryService();
