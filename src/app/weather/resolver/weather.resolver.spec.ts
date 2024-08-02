import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { weatherResolver } from './weather.resolver';

describe('weatherResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) =>
    TestBed.runInInjectionContext(() => weatherResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
