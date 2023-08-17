import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsString, Length } from "class-validator";

@InputType()
export class UpdateTitleInput {

    @Field()
    title: string;
    
}

@InputType()
export class UpdateContentInput {  

    @Field()
    content: string;

}