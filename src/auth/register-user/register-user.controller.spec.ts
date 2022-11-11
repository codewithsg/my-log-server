import { Test, TestingModule } from '@nestjs/testing';
import { RegisterUserController } from './register-user.controller';

describe('RegisterUserController', () => {
  let controller: RegisterUserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RegisterUserController],
    }).compile();

    controller = module.get<RegisterUserController>(RegisterUserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
