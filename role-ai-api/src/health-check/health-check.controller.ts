import { Controller, Get } from "@nestjs/common";

const id = Math.random();

@Controller()
export class HealthcheckController {
  @Get("/api/health-check")
  healthCheck() {
    return { ok: true };
  }

  @Get("/api/check")
  check() {
    return { result: `This is server with id: ${id}` };
  }
}
