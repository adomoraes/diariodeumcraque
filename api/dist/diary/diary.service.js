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
                authorId,
                date: new Date(createDiaryEntryDto.date),
                focus: createDiaryEntryDto.focus,
                notes: createDiaryEntryDto.notes,
                techniquRating: createDiaryEntryDto.techniquRating,
                physicalRating: createDiaryEntryDto.physicalRating,
                mentalRating: createDiaryEntryDto.mentalRating,
                whatWentWell: createDiaryEntryDto.whatWentWell,
                whatWasDifficult: createDiaryEntryDto.whatWasDifficult,
                nextGoal: createDiaryEntryDto.nextGoal,
            },
        });
    }
    async findAll(authorId) {
        return this.prisma.diaryEntry.findMany({
            where: { authorId, isPublished: true },
            orderBy: { date: 'desc' },
        });
    }
    async findOne(id, authorId) {
        const entry = await this.prisma.diaryEntry.findFirst({
            where: { id, authorId },
        });
        if (!entry) {
            throw new common_1.NotFoundException('Registro não encontrado');
        }
        return entry;
    }
    async update(id, updateDiaryEntryDto, authorId) {
        const entry = await this.findOne(id, authorId);
        return this.prisma.diaryEntry.update({
            where: { id },
            data: {
                focus: updateDiaryEntryDto.focus ?? entry.focus,
                notes: updateDiaryEntryDto.notes ?? entry.notes,
                techniquRating: updateDiaryEntryDto.techniquRating ?? entry.techniquRating,
                physicalRating: updateDiaryEntryDto.physicalRating ?? entry.physicalRating,
                mentalRating: updateDiaryEntryDto.mentalRating ?? entry.mentalRating,
                whatWentWell: updateDiaryEntryDto.whatWentWell ?? entry.whatWentWell,
                whatWasDifficult: updateDiaryEntryDto.whatWasDifficult ?? entry.whatWasDifficult,
                nextGoal: updateDiaryEntryDto.nextGoal ?? entry.nextGoal,
            },
        });
    }
    async remove(id, authorId) {
        await this.findOne(id, authorId);
        return this.prisma.diaryEntry.delete({
            where: { id },
        });
    }
    async getWeeklySummary(authorId) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const weekAgo = new Date(today);
        weekAgo.setDate(today.getDate() - 7);
        const entries = await this.prisma.diaryEntry.findMany({
            where: {
                authorId,
                date: {
                    gte: weekAgo,
                    lte: today,
                },
                isPublished: true,
            },
            orderBy: {
                date: 'asc',
            },
        });
        return {
            total: entries.length,
            entries,
            averageRatings: {
                technique: this.calculateAverage(entries.map((e) => e.techniquRating)),
                physical: this.calculateAverage(entries.map((e) => e.physicalRating)),
                mental: this.calculateAverage(entries.map((e) => e.mentalRating)),
            },
        };
    }
    async getMonthlySummary(authorId, year, month) {
        const startDate = new Date(year, month - 1, 1);
        const endDate = new Date(year, month, 0);
        const entries = await this.prisma.diaryEntry.findMany({
            where: {
                authorId,
                date: {
                    gte: startDate,
                    lte: endDate,
                },
                isPublished: true,
            },
            orderBy: {
                date: 'asc',
            },
        });
        return {
            year,
            month,
            total: entries.length,
            entries,
            averageRatings: {
                technique: this.calculateAverage(entries.map((e) => e.techniquRating)),
                physical: this.calculateAverage(entries.map((e) => e.physicalRating)),
                mental: this.calculateAverage(entries.map((e) => e.mentalRating)),
            },
        };
    }
    async getLastThreeEntries(authorId) {
        return this.prisma.diaryEntry.findMany({
            where: { authorId, isPublished: true },
            orderBy: { date: 'desc' },
            take: 3,
        });
    }
    calculateAverage(ratings) {
        const validRatings = ratings.filter((r) => r !== null && r !== undefined);
        if (validRatings.length === 0)
            return null;
        return (Math.round((validRatings.reduce((a, b) => a + b, 0) / validRatings.length) * 10) / 10);
    }
};
exports.DiaryService = DiaryService;
exports.DiaryService = DiaryService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], DiaryService);
//# sourceMappingURL=diary.service.js.map