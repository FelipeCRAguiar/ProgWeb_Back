export class CreateDonationDto {
  userId: number;
  shelterId: number;
  type: string;
  value?: number;
  description?: string;
  status?: string;
}
