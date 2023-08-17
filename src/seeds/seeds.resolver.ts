import { Resolver, Args, Mutation, Query, Context, Int } from '@nestjs/graphql';
import { SeedsService } from './seeds.service';



@Resolver()
export class SeedsResolver {
    constructor(private seedsService: SeedsService) { }

    @Query(() => Boolean, {name: 'createDefaultSeeds', nullable: true})
    async createDefaultSeeds() {
        await this.seedsService.createDefaultSeeds()
        return true
    }
}