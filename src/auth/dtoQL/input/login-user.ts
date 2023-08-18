import { Field, InputType } from "@nestjs/graphql";
import { IsEmail, IsNotEmpty, Length } from "class-validator";

@InputType()
export class LoginUserInput {

    @Field()
    @IsNotEmpty()
    @IsEmail({}, { message: "Incorrect email" })
    email: string;

    @Field()
    @IsNotEmpty()
    @Length(8, 24, { message: 'Must be at least 8 characters and not more than 24' })
    password: string

}