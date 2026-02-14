import { PrismaService } from '../prisma/prisma.service';
import { CreateDiaryEntryDto } from './dto/create-diary-entry.dto';
import { UpdateDiaryEntryDto } from './dto/update-diary-entry.dto';
import { DiaryEntry } from '@prisma/client';
export declare class DiaryService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createDiaryEntryDto: CreateDiaryEntryDto, authorId: string): Promise<DiaryEntry>;
    findAll(authorId: string): Promise<DiaryEntry[]>;
    findOne(id: string, authorId: string): Promise<DiaryEntry>;
    update(id: string, updateDiaryEntryDto: UpdateDiaryEntryDto, authorId: string): Promise<DiaryEntry>;
    remove(id: string, authorId: string): Promise<DiaryEntry>;
    getWeeklySummary(authorId: string): Promise<any>;
    getMonthlySummary(authorId: string, year: number, month: number): Promise<any>;
    getLastThreeEntries(authorId: string): Promise<DiaryEntry[]>;
    private calculateAverage;
}
