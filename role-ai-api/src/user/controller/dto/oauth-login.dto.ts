import { IsNotEmpty, IsString } from 'class-validator';

export class OauthLoginDto {
  @IsString()
  @IsNotEmpty()
  token: string;
}
