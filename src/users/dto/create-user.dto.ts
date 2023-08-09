import { ApiProperty } from "@nestjs/swagger/dist/decorators";

export class CreateUserDto {

    @ApiProperty({example: 'user@gmail.com', description: 'Mail adress.'})
    readonly email: string;

    @ApiProperty({example: 'qwerty123Q', description: 'Password.'})
    readonly password: string;
}