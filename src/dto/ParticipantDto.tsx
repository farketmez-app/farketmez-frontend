import { UserDto } from './UserDto';
import { EventDto } from './EventDto'; 

export interface ParticipantDto {
  id: number;
  user: UserDto;
  rating: number; // TypeScript'te BigDecimal yerine number kullanılır
  comment: string;
  event: EventDto;
}

