import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SeedsService } from './seeds.service';

@ApiTags('Seeds')
@Controller('seeds')
export class SeedsController {
    constructor(private seedsService: SeedsService) { }

    @Post()
    createDefaultSeeds() {
        return this.seedsService.createDefaultSeeds();
    }

}


