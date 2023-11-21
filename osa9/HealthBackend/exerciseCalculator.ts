interface input {
    target: number;
    input: number[];
}
interface result {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}
const parseInput = (args: string[]): input => {
    const input: number[] = [];
    //console.log('args.length ' + args.length);
    if (isNaN(Number(args[2]))) {
        throw new Error(`Not a number in arguments at position 2`);
    }
    const target: number = Number(args[2]);
    for (let i = 3; i < args.length; i++) {
        console.log(`i = ${i} , args[i] = ${args[i]}`);
        if (isNaN(Number(args[i]))) {
            throw new Error(
                `Not a number in arguments at position ${i}, args[i] : ${args[i]}`
            );
        }
        input.push(Number(args[i]));
    }
    //console.log('input: ', input);
    return { target, input };
};

const calculateRating = (averageExercise: number, target: number): number => {
    if (averageExercise > target * 2) {
        return 3;
    } else if (averageExercise > target * 0.8) {
        return 2;
    } else {
        return 1;
    }
};

const ratingDescription = (rating: number): string => {
    let description: string = 'Rating not between 1-3';
    switch (rating) {
        case 3:
            description = 'Good job, you are getting plenty of exercise';
            break;
        case 2:
            description = 'You are getting an okay amount of exercise';
            break;
        case 1:
            description = 'You are not getting enough exercise';
            break;
    }
    return description;
};

export const calculateExercises = (target: number, values: number[]): result => {
    const trainingDays: number = values.reduce(
        (a, b) => (b > 0 ? a + 1 : a),
        0
    );
    const averageExercise: number =
        values.reduce((a, b) => a + b, 0) / values.length || 0;

    const success: boolean = averageExercise > target;

    const rating: number = calculateRating(averageExercise, target);

    const description = ratingDescription(rating);
    return {
        periodLength: values.length,
        trainingDays: trainingDays,
        success: success,
        rating: rating,
        ratingDescription: description,
        target: target,
        average: averageExercise,
    };
};

try {
    const { target, input } = parseInput(process.argv);
    console.log(calculateExercises(target, input));
} catch (error: unknown) {
    if (error instanceof Error) {
        console.log('Error while running :', error);
    }
}

//console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1]));
