import { Body, Controller, Post, ValidationPipe, HttpCode } from '@nestjs/common';
import { LoginService } from './admin-login.service';
import { AdminSigninDto } from './dto/admin-signin.dto';
import { Public } from '../../../auth/decorators/public.decorator';

@Public()
@Controller('admin/auth')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post('signin')
  @HttpCode(200)
  async signin(
    @Body(new ValidationPipe()) body: AdminSigninDto,
  ): Promise<{ access_token: string }> {
    return this.loginService.signin(body.email, body.senha);
  }
}
