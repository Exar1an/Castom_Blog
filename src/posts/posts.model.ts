import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { User } from "../users/users.model";
import { Blog } from "../blogs/blogs.model";

interface PostCreationAttrs {
    title: string;
    content: string;
    userId: number;
    blogId: number;
    image: string;
}


@Table({tableName: 'posts'})
export class Post extends Model<Post, PostCreationAttrs> {

    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.STRING, allowNull: false})
    title: string;

    @Column({type: DataType.STRING, allowNull: false})
    content: string;

    @Column({type: DataType.STRING})
    image: string;

    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER})
    userId: number;

    @ForeignKey(() => Blog)
    @Column({type: DataType.INTEGER})
    blogId: number;

    @BelongsTo(() => User)
    author: User

    @BelongsTo(() => Blog)
    blog: Blog

}