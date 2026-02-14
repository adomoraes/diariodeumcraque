import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
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

  async findAll(authorId: string): Promise<DiaryEntry[]> {
    return this.prisma.diaryEntry.findMany({
      where: { authorId, isPublished: true },
      orderBy: { date: 'desc' },
    });
  }

  async findOne(id: string, authorId: string): Promise<DiaryEntry> {
    const entry = await this.prisma.diaryEntry.findFirst({
      where: { id, authorId },
    });

    if (!entry) {
      throw new NotFoundException('Registro não encontrado');
    }

    return entry;
  }

  async update(
    id: string,
    updateDiaryEntryDto: UpdateDiaryEntryDto,
    authorId: string,
  ): Promise<DiaryEntry> {
    const entry = await this.findOne(id, authorId);

    return this.prisma.diaryEntry.update({
      where: { id },
      data: {
        focus: updateDiaryEntryDto.focus ?? entry.focus,
        notes: updateDiaryEntryDto.notes ?? entry.notes,
        techniquRating:
          updateDiaryEntryDto.techniquRating ?? entry.techniquRating,
        physicalRating:
          updateDiaryEntryDto.physicalRating ?? entry.physicalRating,
        mentalRating: updateDiaryEntryDto.mentalRating ?? entry.mentalRating,
        whatWentWell: updateDiaryEntryDto.whatWentWell ?? entry.whatWentWell,
        whatWasDifficult:
          updateDiaryEntryDto.whatWasDifficult ?? entry.whatWasDifficult,
        nextGoal: updateDiaryEntryDto.nextGoal ?? entry.nextGoal,
      },
    });
  }

  async remove(id: string, authorId: string): Promise<DiaryEntry> {
    await this.findOne(id, authorId);
    return this.prisma.diaryEntry.delete({
      where: { id },
    });
  }

  async getWeeklySummary(authorId: string): Promise<any> {
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

  async getMonthlySummary(
    authorId: string,
    year: number,
    month: number,
  ): Promise<any> {
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

  async getLastThreeEntries(authorId: string): Promise<DiaryEntry[]> {
    return this.prisma.diaryEntry.findMany({
      where: { authorId, isPublished: true },
      orderBy: { date: 'desc' },
      take: 3,
    });
  }

  private calculateAverage(ratings: (number | null)[]): number | null {
    const validRatings = ratings.filter((r) => r !== null && r !== undefined);
    if (validRatings.length === 0) return null;
    return (
      Math.round(
        (validRatings.reduce((a, b) => a + b, 0) / validRatings.length) * 10,
      ) / 10
    );
  }
}
