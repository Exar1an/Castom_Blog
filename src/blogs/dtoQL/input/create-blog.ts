import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsString } from "class-validator";

@InputType()
export class CreateBlogInput {

    @Field()
    @IsNotEmpty()
    @IsString({ message: "Must be string" })
    readonly title: string;

    @Field()
    @IsNotEmpty()
    @IsString({ message: "Must be string" })
    readonly content: string;

}