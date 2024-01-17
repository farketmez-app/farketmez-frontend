import { UserTypeDto } from "./UserTypeDto";

export interface UserDto {
	id: number;
	username: string;
	password: string;
	name: string;
	surname: string;
	age: number;
	gender: number;
	longitude: string;
	latitude: string;
	mail: string;
	userType: UserTypeDto;
	createdAt: string;
	updatedAt: string | null;
	deletedAt: string | null;
}
