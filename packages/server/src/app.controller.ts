import { Controller, Get } from '@nestjs/common'
import { AppService } from './app.service'
import { Public } from './auth'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
}
