import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsString, Length } from "class-validator";

@InputType()
export class AddRoleInput {
    @Field()
    @IsNotEmpty()
    @IsString({ message: "Must be string" })
    value: string;

    @Field()
    @IsNotEmpty()
    userId: number;

}