import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsString, Length } from "class-validator";

@InputType()
export class UpdateBlogInput {

    @Field()
    @IsNotEmpty()
    @IsString({ message: "Must be string" })
    readonly title: string;

    @Field()
    @IsNotEmpty()
    @IsString({ message: "Must be string" })
    readonly content: string;

}