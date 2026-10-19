export class CreateVisitDto {
  userId: number;
  shelterId: number;
  visitDate: string | Date;
  status?: string;
}
