export interface RateRequestDto {
	userId: number;
	eventId: number;
	rate: number; // TypeScript'te BigDecimal yerine number kullanılır
	comment: string;
}
