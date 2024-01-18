import { EventTypeDto } from "./EventTypeDto";
import { LocationDto } from "./LocationDto";

export interface EventDto {
	id: number;
	isActive: boolean;
	isPrivate: boolean;
	title: string;
	cost: string;
	place: string;
	description: string;
	averageRating: number;
	date: string;
	createdAt: string;
	deletedAt: string | null;
	updatedAt: string | null;
	eventType: EventTypeDto;
	location: LocationDto;
	creatorId: number;
}