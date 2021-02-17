## Available Scripts

In the project directory, you can run:

### `npm start`

Open [http://localhost:3003](http://localhost:3003) to view it in the browser.

** Using curl to make requests, by example: **

For bmiCalculator:

> curl -X GET http<nolink>://localhost:3003/bmi?"height=180&weight=88"

For calculateExercises:

> curl http<nolink>://localhost:3003/exercises<br />
> -X POST<br />
> -H "Content-Type: application/json"<br />
> -d '{ "target": 2, "daily_exercises": [1, 0, 2, 4.5, 0, 3, 1, 0, 4] }'

## Command-line interface

You can give the parameters of `bmiCalculator` and `exerciseCalculator` as command line arguments:

For bmiCalculator:

> npm run calculateBmi <height\> <weight\><br />
> npm run calculateBmi 180 91<br />

For calculateExercises:

> npm run calculateExercises <target\> <daily_exercises\><br />
> npm run calculateExercises 2 1 0 2 4\.5 0 3 1 0 4
