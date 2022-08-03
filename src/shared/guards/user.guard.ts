import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { UsersService } from '../../features/users/users.service';

@Injectable()
export class UserGuard implements CanActivate {
  constructor(private userService: UsersService) {}
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();

    // const user = await this.userService.userExist(request.params.id);
    // if (!user) {
    //   throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    // }
    return true;
  }
}
