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
    symptoms: {
        chestPain: "Chest pain",
        numbnessInArm: "Numbness in arm"
    },
    illness: {
        heartAttack: "Possible heart attack. Referring for urgent treatment.",
        notHeartAttack: "Not indicative of a heart attack. Continuous monitoring.",
        heartBurn: "Possible heart burn. Referring for treatment.",
        notHeartBurn: "Not indicative of a heart burn. Continuous monitoring."
    },
    doctor: class {
        defineStrategy = (strategy) => {
            this.strategy = strategy;
        }
        evaluateSymptoms = (pacient) => {
            return this.strategy.evaluateSymptoms(pacient);
        }
    }
};

symptomsEvaluation.strategies = {
    heartAttackStrategy: class extends symptomsEvaluation.contracts.iEvaluationSymptomsStrategy {
        evaluateSymptoms = (pacient) => {
            if (pacient.symptoms.includes(symptomsEvaluation.entities.symptoms.numbnessInArm) &&
                pacient.symptoms.includes(symptomsEvaluation.entities.symptoms.chestPain)) {
                return new symptomsEvaluation.entities.evaluation(true, false, symptomsEvaluation.entities.illness.heartAttack);
            }
            else {
                return new symptomsEvaluation.entities.evaluation(false, false, symptomsEvaluation.entities.illness.notHeartAttack);
            }
        };
    },
    heartBurnStrategy: class extends symptomsEvaluation.contracts.iEvaluationSymptomsStrategy {
        evaluateSymptoms = (pacient) => {
            if (pacient.symptoms.length === 1 &&
                pacient.symptoms.includes(symptomsEvaluation.entities.symptoms.chestPain)) {
                return new symptomsEvaluation.entities.evaluation(false, true, symptomsEvaluation.entities.illness.heartBurn);
            }
            else {
                return new symptomsEvaluation.entities.evaluation(false, false, symptomsEvaluation.entities.illness.notHeartBurn);
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