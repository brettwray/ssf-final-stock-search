import { IsAuthModule } from './is-auth.module';

describe('IsAuthModule', () => {
  let isAuthModule: IsAuthModule;

  beforeEach(() => {
    isAuthModule = new IsAuthModule();
  });

  it('should create an instance', () => {
    expect(isAuthModule).toBeTruthy();
  });
});
