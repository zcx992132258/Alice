import { Controller, Get } from '@nestjs/common'
import { AppService } from './app.service'
import { Public } from './auth'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Public()
  @Get('test')
  test() {
    return 1
  }
}
