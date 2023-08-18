import { Field, InputType } from "@nestjs/graphql";

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