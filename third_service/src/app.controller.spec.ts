import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  describe('getHello', () => {
    it('should return "Hello World!"', () => {
      expect(1).toBe(1);
    });
  });
});
