import { ApiProperty } from "@nestjs/swagger";


export class CreateBlogDto {
    @ApiProperty({ example: 'IT Blog', description: 'Blog name' })
    readonly title: string;
    @ApiProperty({ example: 'How to get into IT?', description: 'Text' })
    readonly content: string;

}