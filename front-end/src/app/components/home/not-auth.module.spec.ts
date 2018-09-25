import { NotAuthModule } from './not-auth.module';

describe('NotAuthModule', () => {
  let notAuthModule: NotAuthModule;

  beforeEach(() => {
    notAuthModule = new NotAuthModule();
  });

  it('should create an instance', () => {
    expect(notAuthModule).toBeTruthy();
  });
});
