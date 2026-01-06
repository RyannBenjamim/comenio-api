import { Body, Controller, Post, ValidationPipe, HttpCode } from '@nestjs/common';
import { LoginService } from './login.service';
import { SigninDto } from './dto/signin.dto';
import { Public } from '../../../auth/decorators/public.decorator';

@Public()
@Controller('api/auth')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post('signin')
  @HttpCode(200) 
  async signin(
    @Body(new ValidationPipe()) body: SigninDto
  ): Promise<{ access_token: string }> {
    const response = await this.loginService.signin(body.email, body.senha);
    return { access_token: response.access_token };
  }
}