import { expect } from 'chai';
import { Stryker } from '@stryker-mutator/core';
import { MutantStatus } from 'mutation-testing-report-schema/api';

describe('Limit counter', () => {

  it('should limit infinite loops in the karma-runner', async () => {
    const stryker = new Stryker({ testRunner: 'karma' });
    const results = await stryker.runMutationTest();
    const timeoutResults = results.filter(res => res.status === MutantStatus.Timeout);
    expect(timeoutResults).lengthOf(3);
    timeoutResults.forEach((result) => expect(result.statusReason).eq('Hit limit reached (501 > 500)'));
  });
});
