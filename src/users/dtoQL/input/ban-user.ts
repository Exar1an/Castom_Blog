import { Field, InputType } from "@nestjs/graphql";
import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";

@InputType()
export class BanUserInput {

    @Field()
    @IsNotEmpty()
    userId: number;

    @Field()
    @IsNotEmpty()
    @IsString({ message: "Must be string" })
    banReason: string;

}