import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { DiaryService } from './diary.service';
import { CreateDiaryEntryDto } from './dto/create-diary-entry.dto';
import { UpdateDiaryEntryDto } from './dto/update-diary-entry.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('diary')
export class DiaryController {
  constructor(private readonly diaryService: DiaryService) {}

  @Get('summary/weekly')
  getWeeklySummary(@Request() req) {
    return this.diaryService.getWeeklySummary(req.user.userId);
  }

  @Post()
  create(@Request() req, @Body() createDiaryEntryDto: CreateDiaryEntryDto) {
    return this.diaryService.create(createDiaryEntryDto, req.user.userId);
  }

  @Get()
  findAll(@Request() req) {
    return this.diaryService.findAll(req.user.userId);
  }

  @Get(':id')
  findOne(@Request() req, @Param('id') id: string) {
    return this.diaryService.findOne(id, req.user.userId);
  }

  @Patch(':id')
  update(
    @Request() req,
    @Param('id') id: string,
    @Body() updateDiaryEntryDto: UpdateDiaryEntryDto,
  ) {
    return this.diaryService.update(id, updateDiaryEntryDto, req.user.userId);
  }

  @Delete(':id')
  remove(@Request() req, @Param('id') id: string) {
    return this.diaryService.remove(id, req.user.userId);
  }
}
