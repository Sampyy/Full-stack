interface result {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}

const target: number = 2;

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

const calculateExercises = (values: number[]): result => {
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

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1]));
