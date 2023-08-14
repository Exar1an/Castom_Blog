import { ApiProperty } from "@nestjs/swagger";


export class CreatePostDto {
    @ApiProperty({ example: 'How to learn js?', description: 'Post name' })
    readonly title: string;
    @ApiProperty({ example: 'Tell me what ways you found the strength to learn js?', description: 'Text' })
    readonly content: string;

}