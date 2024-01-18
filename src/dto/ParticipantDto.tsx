import { UserDto } from './UserDto';
import { EventDto } from './EventDto'; 

export interface ParticipantDto {
  id: number;
  user: UserDto;
  rating: number; 
  comment: string;
  event: EventDto;
}

