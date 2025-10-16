import { Body, Controller, Post, ValidationPipe, HttpCode } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SigninDto } from './dto/signin.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  @HttpCode(200) 
  async signin(
    @Body(new ValidationPipe()) body: SigninDto
  ): Promise<{ access_token: string }> {
    const response = await this.authService.signin(body.email, body.password);
    return { access_token: response.access_token };
  }
}