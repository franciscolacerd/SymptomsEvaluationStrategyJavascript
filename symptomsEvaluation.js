const symptomsEvaluation = {};

symptomsEvaluation.contracts = {
    iEvaluationSymptomsStrategy: class {
        evaluateSymptoms = (pacient) => { };
    }
};

symptomsEvaluation.entities = {
    evaluation: class {
        constructor(isHeartAttack, isHeartBurn, message) {
            this.isHeartAttack = isHeartAttack;
            this.isHeartBurn = isHeartBurn;
            this.message = message;
        }
    },
    pacient: class {
        constructor(name, age) {
            this.name = name;
            this.age = age;
        }
        addSymptioms = (symptoms) => {
            this.symptoms = symptoms;
        }
    },
    symptoms: class {
        constructor() {
            this.chestPain = "Chest pain";
            this.numbnessInArm = "Numbness in arm";
        }
    },
    illness: class {
        constructor() {
            this.hearthAttack = "Possible heart attack. Referring for urgent treatment.";
            this.notHearthAttack = "Not indicative of a heart attack. Continuous monitoring.";
            this.hearthBurn = "Possible heart burn. Referring for treatment.";
            this.notHearthBurn = "Not indicative of a heart burn. Continuous monitoring.";
        }
    },
    doctor: class {
        constructor(strategy) {
            this.strategy = strategy;
        }
        evaluateSymptoms = (pacient) => {
            this.strategy.evaluateSymptoms(pacient);
        }
    }
};

symptomsEvaluation.strategies = {
    heartAttackStrategy: class extends symptomsEvaluation.contracts.iEvaluationSymptomsStrategy {
        evaluateSymptoms = (pacient) => {
            if (pacient.symptoms.includes(symptomsEvaluation.entities.symptoms.numbnessInArm) &&
                pacient.symptoms.includes(symptomsEvaluation.entities.symptoms.chestPain)) {
                return new symptomsEvaluation.entities.evaluation(true, false, symptomsEvaluation.entities.illness.hearthAttack);
            }
            else {
                return new symptomsEvaluation.entities.evaluation(false, false, symptomsEvaluation.entities.illness.notHearthAttack);
            }
        };
    },
    heartBurnStrategy: class extends symptomsEvaluation.contracts.iEvaluationSymptomsStrategy {
        evaluateSymptoms = (pacient) => {
            if (pacient.symptoms.length === 1 &&
                pacient.symptoms.includes(symptomsEvaluation.entities.symptoms.chestPain)) {
                return new symptomsEvaluation.entities.evaluation(false, true, symptomsEvaluation.entities.illness.hearthBurn);
            }
            else {
                return new symptomsEvaluation.entities.evaluation(false, false, symptomsEvaluation.entities.illness.notHearthBurn);
            }
        };
    }
};


symptomsEvaluation.tester = {
    test: () => {
        return true;
    }
};

module.exports = symptomsEvaluation;