import { Field, InputType } from "@nestjs/graphql";
import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";

@InputType()
export class CreateUserInput {
    @Field()
    @IsNotEmpty()
    @IsString({ message: "Must be string" })
    @IsEmail({}, { message: "Incorrect email" })
    email: string;

    @Field()
    @IsNotEmpty()
    @Length(8, 24, { message: 'Must be at least 8 characters and not more than 24' })
    password: string;

    @Field()
    @IsString({ message: "Must be string" })
    firstName: string;

    @Field()
    @IsString({ message: "Must be string" })
    lastName: string;
}