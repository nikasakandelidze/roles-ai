import { Controller, Get } from "@nestjs/common";

@Controller()
export class HealthcheckController {
  @Get("/api/health-check")
  healthCheck() {
    return { ok: true };
  }
}
