import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateDiaryEntryDto } from './dto/create-diary-entry.dto';
import { UpdateDiaryEntryDto } from './dto/update-diary-entry.dto';
import { DiaryEntry } from '@prisma/client';

@Injectable()
export class DiaryService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    createDiaryEntryDto: CreateDiaryEntryDto,
    authorId: string,
  ): Promise<DiaryEntry> {
    return this.prisma.diaryEntry.create({
      data: {
        content: createDiaryEntryDto.content,
        authorId,
      },
    });
  }

  async findAll(authorId: string): Promise<DiaryEntry[]> {
    return this.prisma.diaryEntry.findMany({
      where: { authorId },
    });
  }

  async findOne(id: string, authorId: string): Promise<DiaryEntry | null> {
    return this.prisma.diaryEntry.findFirst({
      where: { id, authorId },
    });
  }

  async update(
    id: string,
    updateDiaryEntryDto: UpdateDiaryEntryDto,
    authorId: string,
  ): Promise<DiaryEntry> {
    return this.prisma.diaryEntry.update({
      where: { id, authorId },
      data: {
        content: updateDiaryEntryDto.content,
      },
    });
  }

  async remove(id: string, authorId: string): Promise<DiaryEntry> {
    return this.prisma.diaryEntry.delete({
      where: { id, authorId },
    });
  }

  async getWeeklySummary(authorId: string): Promise<any> {
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
    }, {} as Record<number, number>);

    return summary;
  }
}
