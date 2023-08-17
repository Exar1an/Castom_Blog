import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { UsersModule } from './users/users.module';
import { ConfigModule } from "@nestjs/config";
import { User } from "./users/users.model";
import { RolesModule } from './roles/roles.module';
import { Role } from "./roles/roles.model";
import { UserRoles } from "./roles/user-roles.model";
import { AuthModule } from './auth/auth.module';
import { PostModule } from './posts/posts.module';
import { Post } from "./posts/posts.model";
import { FilesModule } from './files/files.module';
import { SeedsModule } from './seeds/seeds.module';
import { BlogsModule } from './blogs/blogs.module';
import { Blog } from "./blogs/blogs.model";
import { RouterModule, Routes } from "@nestjs/core";
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";

const routes: Routes = [
  {
    path: '/blogs',
    module: BlogsModule,
    children: [
      {
        path: ':blogId/posts',
        module: PostModule,
      },
    ],
  },
]
@Module({
  controllers: [],
  providers: [],
  imports: [
    RouterModule.register(routes),
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`
    }),
    // ServeStaticModule.forRoot({
    //   rootPath: path.resolve(__dirname, 'static')
    // }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [User, Role, UserRoles, Post, Blog],
      autoLoadModels: true
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'src/schema.gql',
    }),
    UsersModule,
    RolesModule,
    AuthModule,
    PostModule,
    FilesModule,
    SeedsModule,
    BlogsModule,
  ]
})
export class AppModule { }