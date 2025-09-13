import { DiaryService } from './diary.service';
import { CreateDiaryEntryDto } from './dto/create-diary-entry.dto';
import { UpdateDiaryEntryDto } from './dto/update-diary-entry.dto';
export declare class DiaryController {
    private readonly diaryService;
    constructor(diaryService: DiaryService);
    getWeeklySummary(req: any): Promise<any>;
    create(req: any, createDiaryEntryDto: CreateDiaryEntryDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        authorId: string;
        content: string;
    }>;
    findAll(req: any): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        authorId: string;
        content: string;
    }[]>;
    findOne(req: any, id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        authorId: string;
        content: string;
    } | null>;
    update(req: any, id: string, updateDiaryEntryDto: UpdateDiaryEntryDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        authorId: string;
        content: string;
    }>;
    remove(req: any, id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        authorId: string;
        content: string;
    }>;
}
