# Symptoms Evaluation - Strategy Pattern - Javascript
Strategy Pattern Javascript implementation of an Hospital Symptoms Evaluation System

In this example, multiple strategies are defined for patient symptom evaluation by a Doctor. The HeartBurnStrategy defines a set of criteria and logic to assess symptoms associated with heartburn or indigestion. On the other hand, the HeartAttackStrategy defines a distinct set of criteria and logic to evaluate symptoms that could indicate a potential heart attack. By employing a range of strategies, the Doctor can accurately assess various health conditions based on the presented symptoms and provide appropriate medical care or recommendations.

------

In computer programming, the strategy pattern (also known as the policy pattern) is a behavioral software design pattern that enables selecting an algorithm at runtime. Instead of implementing a single algorithm directly, code receives run-time instructions as to which in a family of algorithms to use.

![Strategy_pattern_UML](https://upload.wikimedia.org/wikipedia/commons/4/45/W3sDesign_Strategy_Design_Pattern_UML.jpg)

https://en.wikipedia.org/wiki/Strategy_pattern

------
## How to run

1. Clone project

2. Run to install dependencies
```npm
npm i
```

3. Run to start Jest
```npm
npx jest
```

------

## Javascript Implementation

### 1. Declare entities 

```javascript
const symptomsEvaluation = {};


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

```

### 2. Declare the strategy base class

```javascript
symptomsEvaluation.contracts = {
    iEvaluationSymptomsStrategy: class {
        evaluateSymptoms = (pacient) => { };
    }
};
```

### 3. Declare concrete strategy subclasses

```javascript

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


module.exports = pacientsState;
```

### 4. Unit test it (Jest)

```javascript
  const symptomsEvaluation = require('./symptomsEvaluation');

describe('symptoms evaluation test', () => {
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

```
