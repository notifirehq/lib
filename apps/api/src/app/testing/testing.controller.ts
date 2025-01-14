import { Body, Controller, Get, HttpException, NotFoundException, Post } from '@nestjs/common';
import { DalService } from '@novu/dal';
import { ProductFeatureKeyEnum, ResourceEnum } from '@novu/shared';

import { ApiExcludeEndpoint, ApiProperty, ApiTags } from '@nestjs/swagger';
import { ResourceCategory } from '@novu/application-generic';
import { ISeedDataResponseDto, SeedDataBodyDto } from './dtos/seed-data.dto';
import { IdempotencyBodyDto } from './dtos/idempotency.dto';
import { CreateSession } from './usecases/create-session/create-session.usecase';
import { CreateSessionCommand } from './usecases/create-session/create-session.command';
import { ExternalApiAccessible } from '../auth/framework/external-api.decorator';
import { ProductFeature } from '../shared/decorators/product-feature.decorator';
import { UserAuthentication } from '../shared/framework/swagger/api.key.security';
import { SdkGroupName, SdkMethodName } from '../shared/framework/swagger/sdk.decorators';
import { ApiCommonResponses, ApiCreatedResponse, ApiOkResponse } from '../shared/framework/response.decorator';

export class IdempotencyResponse {
  @ApiProperty({
    description: 'A unique identifier for the idempotency response',
    type: Number,
  })
  number: number;
}

@Controller('/testing')
@ApiCommonResponses()
@ApiTags('Admin')
@SdkGroupName('admin.testing')
export class TestingController {
  constructor(
    // private seedDataUsecase: SeedData,
    private dalService: DalService,
    private createSessionUsecase: CreateSession
  ) {}

  @Post('/clear-db')
  @ApiExcludeEndpoint()
  async clearDB(@Body() body: SeedDataBodyDto): Promise<{ ok: boolean }> {
    if (process.env.NODE_ENV !== 'test') throw new NotFoundException();

    await this.dalService.destroy();

    return {
      ok: true,
    };
  }

  /**
   * Used for seeding data for client e2e tests,
   * Currently just creates a new user session and returns signed JWT
   */
  @Post('/session')
  @ApiExcludeEndpoint()
  async getSession(@Body() body: SeedDataBodyDto): Promise<ISeedDataResponseDto> {
    if (process.env.NODE_ENV !== 'test') throw new NotFoundException();
    const command = CreateSessionCommand.create({});

    return await this.createSessionUsecase.execute(command);
  }

  @ExternalApiAccessible()
  @UserAuthentication()
  @ApiCreatedResponse({ type: IdempotencyResponse, status: 201 })
  @Post('/idempotency')
  @SdkMethodName('idempotencyPost')
  async idempotency(@Body() body: IdempotencyBodyDto): Promise<IdempotencyResponse> {
    if (process.env.NODE_ENV !== 'test') throw new NotFoundException();

    if (body.data > 300) {
      throw new HttpException(`${Math.random()}`, body.data);
    }
    if (body.data === 250) {
      // for testing conflict
      await new Promise((resolve) => {
        setTimeout(resolve, 500);
      });
    }

    return { number: Math.random() };
  }
  @ApiOkResponse({ type: IdempotencyResponse })
  @ExternalApiAccessible()
  @SdkMethodName('idempotencyGet')
  @Get('/idempotency')
  async idempotencyGet(): Promise<IdempotencyResponse> {
    if (process.env.NODE_ENV !== 'test') throw new NotFoundException();

    return { number: Math.random() };
  }

  @ExternalApiAccessible()
  @UserAuthentication()
  @Get('/product-feature')
  @ProductFeature(ProductFeatureKeyEnum.TRANSLATIONS)
  @ApiExcludeEndpoint()
  async productFeatureGet(): Promise<{ number: number }> {
    if (process.env.NODE_ENV !== 'test') throw new NotFoundException();

    return { number: Math.random() };
  }

  @ExternalApiAccessible()
  @UserAuthentication()
  @Get('/resource-limiting-default')
  @ApiExcludeEndpoint()
  async resourceLimitingDefaultGet(): Promise<{ number: number }> {
    if (process.env.NODE_ENV !== 'test') throw new NotFoundException();

    return { number: Math.random() };
  }

  @ExternalApiAccessible()
  @UserAuthentication()
  @Get('/resource-limiting-events')
  @ResourceCategory(ResourceEnum.EVENTS)
  @ApiExcludeEndpoint()
  async resourceLimitingEventsGet(): Promise<{ number: number }> {
    if (process.env.NODE_ENV !== 'test') throw new NotFoundException();

    return { number: Math.random() };
  }
}
