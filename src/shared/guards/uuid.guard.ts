import {CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {isUUID} from "class-validator";

@Injectable()
export class UuidGuard implements CanActivate {
    async canActivate(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest();

        if (!isUUID(request.params.id)) {
            throw new HttpException('Invalid UUID', HttpStatus.BAD_REQUEST);
        }

        return true
    }
}
