import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import {FavoritesModule} from "../favorites/favorites.module";

@Module({
  imports: [FavoritesModule],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {}
