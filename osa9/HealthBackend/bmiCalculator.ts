interface calcValues {
    value1: number;
    value2: number;
}

const parseArguments = (args: string[]): calcValues => {
    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
        return {
            value1: Number(args[2]),
            value2: Number(args[3]),
        };
    } else {
        throw new Error('Provided values are not numbers');
    }
};

const calculateBmi = (value1: number, value2: number) => {
    const squaredHeight: number = (value1 * value1) / 10000;
    const bmiValue: number = value2 / squaredHeight;
    if (bmiValue >= 40) {
        return 'Obese class 3 (Overweight)';
    } else if (bmiValue >= 35) {
        return 'Obese class 2 (Overweight)';
    } else if (bmiValue >= 30) {
        return 'Obese class 1 (Overweight)';
    } else if (bmiValue >= 25) {
        return 'Pre-obese (Overweight)';
    } else if (bmiValue >= 18.5) {
        return 'Normal (Healthy weight)';
    } else if (bmiValue >= 17) {
        return 'Mild thinness (Underweight)';
    } else if (bmiValue >= 16) {
        return 'Moderate thinness (Underweight)';
    } else if (bmiValue >= 0) {
        return 'Severe thinness (Underweight)';
    } else {
        return 'Impossible values';
    }
};

try {
    console.log(calculateBmi(180, 74));
} catch (error: unknown) {
    let errorMessage = 'Error while running';
    if (error instanceof Error) {
        errorMessage += 'Error: ' + error.message;
    }

    console.log(errorMessage);
}
