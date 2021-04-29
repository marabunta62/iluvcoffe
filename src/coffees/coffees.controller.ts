import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import { CoffeesService } from './coffees.service';
import { CreateCoffeDto } from './dto/create-coffe.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { ParseIntPipe } from '../common/pipes/parse-int.pipe';
import { ApiResponse } from '@nestjs/swagger';

@Controller('coffees')
export class CoffeesController {
  constructor(private readonly coffeesService: CoffeesService) {}

  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Get()
  findAll(@Query() paginationQuery: PaginationQueryDto) {
    // await new Promise(resolve => setTimeout(resolve, 5000));
    return this.coffeesService.findAll(paginationQuery);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: string) {
    return this.coffeesService.findOne(id);
  }

  @Post()
  create(@Body() createCoffeeDto: CreateCoffeDto) {
    return this.coffeesService.create(createCoffeeDto);
  }

  @Patch(':id')
  update(id: string, @Body() updateCoffeeDto: UpdateCoffeeDto) {
    return this.coffeesService.update(id, updateCoffeeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.coffeesService.remove(id);
  }
}
