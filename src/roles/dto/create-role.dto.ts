import { ApiProperty } from "@nestjs/swagger";

export class  CreateRoleDto {
    @ApiProperty({example: "Writer", description: 'Role name'})
    readonly value: string;
    @ApiProperty({example: "Description", description: '...'})
    readonly description: string;
}