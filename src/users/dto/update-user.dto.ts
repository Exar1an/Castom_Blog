import { ApiProperty } from "@nestjs/swagger/dist/decorators";
import { IsString, Length, IsEmail } from "class-validator";

export class UpdateUserDto {

    @ApiProperty({ example: 'user@gmail.com', description: 'Mail adress.' })
    @IsString({ message: "Must be string" })
    @IsEmail({}, { message: "Incorrect email" })
    readonly email: string;

    @ApiProperty({ example: 'qwerty123Q', description: 'Password.' })
    @IsString({ message: "Must be string" })
    @Length(8, 24, { message: 'Must be at least 8 characters and not more than 24' })
    readonly password: string;

    @ApiProperty({ example: 'Zhora', description: 'firstName' })
    @IsString({ message: "Must be string" })
    readonly firstName: string;

    @ApiProperty({ example: 'Asauliak', description: 'firstName' })
    @IsString({ message: "Must be string" })
    readonly lastName: string;
}