import { prisma} from '../db/prisma';

class CategoryService {
    async create(name: string) {
        return await prisma.category.create({
            data: { name },
        });
    }
}

export const categorySevice = new CategoryService();
