import { ApiProperty } from "@nestjs/swagger";


export class UpdatePostDto {
    @ApiProperty({ example: 'How to learn js?', description: 'Post name', required: false })
    readonly title?: string;
    @ApiProperty({ example: 'Tell me what ways you found the strength to learn js?', description: 'Text', required: false })
    readonly content?: string;

}