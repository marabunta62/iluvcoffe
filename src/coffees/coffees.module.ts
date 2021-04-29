import { Module } from '@nestjs/common';
import { CoffeesService } from './coffees.service';
import { CoffeesController } from './coffees.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Coffee } from './entities/coffees.entity';
import { Flavor } from './entities/flavor.entity';
import { COFFEE_BRANDS } from './enums/coffees.constants';

class ConfigService {}
class DevelopmentConfigService {}
class ProductionConfigService {}

@Module({
  imports: [TypeOrmModule.forFeature([Coffee, Flavor])],
  controllers: [CoffeesController],
  providers: [
    CoffeesService,
    {
      provide: ConfigService,
      useClass:
        process.env.NODE_ENV === 'development'
          ? DevelopmentConfigService
          : ProductionConfigService,
    },
    { provide: COFFEE_BRANDS, useValue: ['buddy brew', 'nescafe'] },
  ],
  //encapsulation : expose CoffeeService
  exports: [CoffeesService],
})
export class CoffeesModule {}
