export interface DiaryEntry {
  id: string;
  authorId: string;
  date: string;
  focus?: string;
  notes?: string;
  techniquRating?: number;
  physicalRating?: number;
  mentalRating?: number;
  whatWentWell?: string;
  whatWasDifficult?: string;
  nextGoal?: string;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}
