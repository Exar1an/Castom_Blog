import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SeedsService } from './seeds.service';

@ApiTags('Seeds')
@Controller('seeds')
export class SeedsController {
    constructor(private seedsService: SeedsService) { }

    @ApiOperation({summary: 'Create default roles and admin.'})
    @ApiResponse({status: 201})
    @Post()
    createDefaultSeeds() {
        return this.seedsService.createDefaultSeeds();
    }

}


