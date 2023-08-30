const symptomsEvaluation = require('./symptomsEvaluation');

describe('control test', () => {
    test('call-tester', () => {
        expect(symptomsEvaluation.tester.test()).toBeTruthy();
    });
});
