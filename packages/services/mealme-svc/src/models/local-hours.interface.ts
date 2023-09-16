import { DailyHours } from './daily-hours.interface';

export interface LocalHours {
  operational: DailyHours;
  delivery: DailyHours;
  pickup: DailyHours;
  dine_in: DailyHours;
}
