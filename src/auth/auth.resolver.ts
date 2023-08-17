import { Resolver, Args, Mutation, Query, Context, Int } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { TokenModel } from './dtoQL/get-token';
import { RegUserInput } from './dtoQL/input/registration-user';
import { LoginUserInput } from './dtoQL/input/login-user';


@Resolver()
export class AuthResolver {
    constructor(private authService: AuthService) { }

    @Mutation(() => TokenModel)
    registration(
        @Args('regUserData') regUserData: RegUserInput,
    ) {
        return this.authService.registration(regUserData)
    }

    @Mutation(() => TokenModel)
    login(
        @Args('loginUserData') loginUserData: LoginUserInput,
    ) {
        return this.authService.login(loginUserData)
    }


}