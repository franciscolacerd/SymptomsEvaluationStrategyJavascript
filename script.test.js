const symptomsEvaluation = require('./symptomsEvaluation');

describe('control test', () => {
    test('call-tester', () => {
        expect(symptomsEvaluation.tester.test()).toBeTruthy();
    });
});


describe('symptoms evaluation test', () => {
    test('confirm-heartburn-return-heartburn', () => {
        // Arrange
        const symptoms = [symptomsEvaluation.entities.symptoms.chestPain];

        const pacient = new symptomsEvaluation.entities.pacient("francisco lacerda", 45);

        pacient.addSymptioms(symptoms);

        const doctor = new symptomsEvaluation.entities.doctor();

        // Act
        doctor.defineStrategy(new symptomsEvaluation.strategies.heartBurnStrategy());

        const evaluation = doctor.evaluateSymptoms(pacient);

        // Assert
        expect(evaluation.isHeartBurn).toBeTruthy();

        expect(evaluation.message).toBe(symptomsEvaluation.entities.illness.heartBurn);
    });

    test('confirm-heartburn-return-not-heartburn', () => {
        // Arrange
        const symptoms = [symptomsEvaluation.entities.symptoms.numbnessInArm];

        const pacient = new symptomsEvaluation.entities.pacient("francisco lacerda", 45);

        pacient.addSymptioms(symptoms);

        const doctor = new symptomsEvaluation.entities.doctor();

        // Act
        doctor.defineStrategy(new symptomsEvaluation.strategies.heartBurnStrategy());

        const evaluation = doctor.evaluateSymptoms(pacient);

        // Assert
        expect(evaluation.isHeartBurn).toBeFalsy();

        expect(evaluation.message).toBe(symptomsEvaluation.entities.illness.notHeartBurn);
    });

    test('confirm-heartattack-return-heartattack', () => {
        // Arrange
        const symptoms = [symptomsEvaluation.entities.symptoms.chestPain,
        symptomsEvaluation.entities.symptoms.numbnessInArm];

        const pacient = new symptomsEvaluation.entities.pacient("francisco lacerda", 45);

        pacient.addSymptioms(symptoms);

        const doctor = new symptomsEvaluation.entities.doctor();

        // Act
        doctor.defineStrategy(new symptomsEvaluation.strategies.heartAttackStrategy());

        const evaluation = doctor.evaluateSymptoms(pacient);

        // Assert
        expect(evaluation.isHeartAttack).toBeTruthy();

        expect(evaluation.message).toBe(symptomsEvaluation.entities.illness.heartAttack);
    });


    test('confirm-heartattack-return-not-heartattack', () => {
        // Arrange
        const symptoms = [symptomsEvaluation.entities.symptoms.chestPain];

        const pacient = new symptomsEvaluation.entities.pacient("francisco lacerda", 45);

        pacient.addSymptioms(symptoms);

        const doctor = new symptomsEvaluation.entities.doctor();

        // Act
        doctor.defineStrategy(new symptomsEvaluation.strategies.heartAttackStrategy());

        const evaluation = doctor.evaluateSymptoms(pacient);

        // Assert
        expect(evaluation.isHeartAttack).toBeFalsy();

        expect(evaluation.message).toBe(symptomsEvaluation.entities.illness.notHeartAttack);
    });


    test('try-confirm-heartattack-or-heartburn-return-heartattack', () => {
        // Arrange
        const symptoms = [symptomsEvaluation.entities.symptoms.chestPain,
        symptomsEvaluation.entities.symptoms.numbnessInArm];

        const pacient = new symptomsEvaluation.entities.pacient("francisco lacerda", 45);

        pacient.addSymptioms(symptoms);

        let doctor = new symptomsEvaluation.entities.doctor();

        // Act
        /*HeartBurn Strategy*/
        doctor.defineStrategy(new symptomsEvaluation.strategies.heartBurnStrategy());

        let evaluation = doctor.evaluateSymptoms(pacient);

        // Assert
        expect(evaluation.isHeartBurn).toBeFalsy();

        expect(evaluation.message).toBe(symptomsEvaluation.entities.illness.notHeartBurn);

        // Act
        /*HeartAttack Strategy*/
        doctor.defineStrategy(new symptomsEvaluation.strategies.heartAttackStrategy());

        evaluation = doctor.evaluateSymptoms(pacient);

        // Assert
        expect(evaluation.isHeartAttack).toBeTruthy();

        expect(evaluation.message).toBe(symptomsEvaluation.entities.illness.heartAttack);
    });

});
