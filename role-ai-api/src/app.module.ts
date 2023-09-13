import { Module } from "@nestjs/common";
import { UserModule } from "./user/user.module";
import { CharacterModule } from "./character/character.module";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmConfigService } from "./config/typeorm.config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { OpenAIModule } from "./openai/openai.module";
import { JwtModule } from "@nestjs/jwt";
import { JWT_SECRET } from "./utils/constants";
import { CryptoService } from "./utils/crypto.service";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath:
        process.env.NODE_ENV === "development" ? ".env.development" : ".env",
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({ useClass: TypeOrmConfigService }),
    JwtModule.register({
      global: true,
      secret: JWT_SECRET,
      signOptions: { expiresIn: "2h" },
    }),
    OpenAIModule,
    UserModule,
    CharacterModule,
  ],
  controllers: [],
  providers: [CryptoService],
})
export class AppModule {}
