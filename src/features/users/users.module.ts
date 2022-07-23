import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { FavoritesModule } from '../favorites/favorites.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';

@Module({
  imports: [
      TypeOrmModule.forFeature([UserEntity]),
    FavoritesModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
