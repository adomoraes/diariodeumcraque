"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiaryService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let DiaryService = class DiaryService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createDiaryEntryDto, authorId) {
        return this.prisma.diaryEntry.create({
            data: {
                content: createDiaryEntryDto.content,
                authorId,
            },
        });
    }
    async findAll(authorId) {
        return this.prisma.diaryEntry.findMany({
            where: { authorId },
        });
    }
    async findOne(id, authorId) {
        return this.prisma.diaryEntry.findFirst({
            where: { id, authorId },
        });
    }
    async update(id, updateDiaryEntryDto, authorId) {
        return this.prisma.diaryEntry.update({
            where: { id, authorId },
            data: {
                content: updateDiaryEntryDto.content,
            },
        });
    }
    async remove(id, authorId) {
        return this.prisma.diaryEntry.delete({
            where: { id, authorId },
        });
    }
    async getWeeklySummary(authorId) {
        const today = new Date();
        const weekAgo = new Date(today);
        weekAgo.setDate(today.getDate() - 7);
        const entries = await this.prisma.diaryEntry.findMany({
            where: {
                authorId,
                createdAt: {
                    gte: weekAgo,
                    lte: today,
                },
            },
            orderBy: {
                createdAt: 'asc',
            },
        });
        const summary = entries.reduce((acc, entry) => {
            const day = entry.createdAt.getDay();
            acc[day] = (acc[day] || 0) + 1;
            return acc;
        }, {});
        return summary;
    }
};
exports.DiaryService = DiaryService;
exports.DiaryService = DiaryService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], DiaryService);
//# sourceMappingURL=diary.service.js.map