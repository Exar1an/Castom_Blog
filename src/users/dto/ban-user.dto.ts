import { ApiProperty } from "@nestjs/swagger";

export class BanUserDto {
    @ApiProperty({ example: 1, description: 'user id' })
    readonly userId: number;
    @ApiProperty({ example: 'Toxic', description: 'ban reason' })
    banReason: string;
}