interface ExerciseCalculatorArguments {
    targetHours: number;
    hoursPerDay: Array<number>;
}

interface ExerciseCalculator {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}

const passExerciseCalucatorArguments = (args: Array<string>): ExerciseCalculatorArguments => {
    if (args.length < 4) throw new Error('Not enough arguments');

    const haveNaN = args.slice(2).some(arg => isNaN(Number(arg)));

    if (!haveNaN) {
        const targetHours = Number(args[2]);
        const hoursPerDay = args.slice(3).map(hours => Number(hours));

        return {
            targetHours,
            hoursPerDay
        }
    } else {
        throw new Error('Provided values are not valid, they must be numbers.');
    }
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

let input: Array<string> = [];
for (let i = 0; process.argv[i] !== undefined; i++) {
    input.push(process.argv[i]);
}

try {
    const { targetHours, hoursPerDay } = passExerciseCalucatorArguments(input);
    console.log(calculateExercises(hoursPerDay, targetHours));
} catch(error) {
    console.log('Error:', error.message);
}
