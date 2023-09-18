import {
  Controller,
  Post,
  UseGuards,
  Request,
  Req,
  Body,
  Get,
  Param,
} from "@nestjs/common";
import { AuthGuard } from "../../utils/crypto.service";
import { StartSessionDto } from "../dto/start-session.dto";
import { SessionService } from "../service/session.service";

@Controller()
export class SessionController {
  constructor(private readonly sessionService: SessionService) {}

  @UseGuards(AuthGuard)
  @Post("/api/session/start")
  async startNewSession(
    @Req() request: Request,
    @Body() startSession: StartSessionDto,
  ) {
    const userId: string = request["user"].sub;
    return this.sessionService.startSession({ ...startSession, userId });
  }

  @UseGuards(AuthGuard)
  @Get("/api/session/:id")
  async fetchSession(@Param("id") sessionId: string, @Req() request: any) {
    const userId: string = request["user"].sub;
    return this.sessionService.getSessionById(sessionId, userId);
  }
}