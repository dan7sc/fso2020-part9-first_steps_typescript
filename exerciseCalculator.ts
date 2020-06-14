interface ExerciseCalculator {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}

const calculateExercises = (
    dailyExerciseHours: Array<number>,
    amountOfDailyHours: number
): ExerciseCalculator => {
    const periodLength: number = dailyExerciseHours.length;

    const trainingDays: number = dailyExerciseHours.filter(
        hours => hours > 0
    ).length;

    const target: number = amountOfDailyHours;

    const average: number = dailyExerciseHours.reduce(
        (sum, currentHours) => sum + currentHours, 0
    ) / periodLength;

    const success: boolean = average >= target;

    const metric: number = (target - average) / target;

    const rating: number = (metric <= 0.02) ? 3 : (metric <= 0.15) ? 2 : 1;

    const ratingDescription: string = [
        'very bad',
        'not too bad but could be better',
        'very good'
    ][rating - 1];

    const result: ExerciseCalculator = {
        periodLength,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target,
        average
    };

    return result;
}

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
