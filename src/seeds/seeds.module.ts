import { Module } from '@nestjs/common';
import { SeedsController } from './seeds.controller';
import { SeedsService } from './seeds.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Role } from '../roles/roles.model';
import { User } from '../users/users.model';
import { UserRoles } from '../roles/user-roles.model';
import { Post } from '../posts/posts.model';
import { RolesModule } from '../roles/roles.module';
import { SeedsResolver } from './seeds.resolver';

@Module({
  controllers: [SeedsController],
  providers: [SeedsService, SeedsResolver],
  imports: [
    SequelizeModule.forFeature([Role, User, UserRoles, Post]),
    RolesModule
  ],
  exports: [
    SeedsService,
  ]
})
export class SeedsModule {}
