import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { User } from "../users/users.model";
import { Post } from "../posts/posts.model";

interface BlogCreationAttrs {
    title: string;
    content: string;
    userId: number;
}


@Table({tableName: 'blogs'})
export class Blog extends Model<Blog, BlogCreationAttrs> {

    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.STRING, allowNull: false})
    title: string;

    @Column({type: DataType.STRING, allowNull: false})
    content: string;

    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER})
    userId: number;

    @HasMany(() => Post)
    posts: Post[];
    
    @BelongsTo(() => User)
    author: User

}