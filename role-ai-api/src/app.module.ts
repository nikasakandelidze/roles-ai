import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { CharacterModule } from './character/character.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmConfigService } from './config/typeorm.config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    UserModule,
    CharacterModule,
    ConfigModule.forRoot({
      envFilePath:
        process.env.NODE_ENV === 'development' ? '.env.development' : '.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({ useClass: TypeOrmConfigService }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
