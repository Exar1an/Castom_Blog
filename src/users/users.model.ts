import { ApiProperty } from "@nestjs/swagger";
import { BelongsToMany, Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { Role } from "../roles/roles.model";
import { UserRoles } from "../roles/user-roles.model";
import { Post } from "../posts/posts.model";


interface UserCreationAttrs {
    email: string;
    password: string;
}


@Table({tableName: 'users'})
export class User extends Model<User, UserCreationAttrs> {
    @ApiProperty({example: '1', description: 'Unique id.'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example: 'user@gmail.com', description: 'Mail adress.'})
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    email: string;

    @ApiProperty({example: 'qwerty123Q', description: 'Password.'})
    @Column({type: DataType.STRING, allowNull: false})
    password: string;

    @ApiProperty({example: 'true', description: 'Ban or not.'})
    @Column({type: DataType.BOOLEAN, defaultValue: false})
    banned: boolean;
    
    @ApiProperty({example: 'Mat', description: 'Ban reason.'})
    @Column({type: DataType.STRING, defaultValue: false})
    banReason: string;

    @BelongsToMany(() => Role, () => UserRoles)
    roles: Role[];
    
    @HasMany(() => Post)
    posts: Post[]
}