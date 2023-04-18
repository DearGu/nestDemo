import { Body, Controller, Get, Param, Post, Query, Req } from '@nestjs/common';
import { Request } from 'express';

@Controller('posts')
export class PostsController {
  @Get('all')
  getAllPosts(@Query() request: Request): string {
    console.log(request);

    return 'getAll';
  }

  @Post('create')
  createPost(@Body() request): string {
    console.log(request);

    return 'create';
  }
}
