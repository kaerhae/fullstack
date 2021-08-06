interface Result {
  periodLenght: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

interface ExerciseValues {
  target: number;
  period: number[]
}

// Provide target amout first as argument
const parseArguments = (
  args: Array<string>): ExerciseValues => {

    if (args.length > 10) throw new Error('Provide only one full week per time');


    const sliceArg =args.slice(3);
    const atoi = sliceArg.map(s => {
      return parseFloat(s);
    });

    if (!isNaN(Number(args[2])) && !atoi.some(isNaN)) {
      return {
        target: Number(args[2]),
        period: atoi
      };
    } else {
      throw new Error('Provided values were not numbers!');
    }
};

export const calculateExercises = (
  target: number,
  period: number[]): Result => {
    let isSuccess;
    let ratingInt;
    let ratingString;
    const daysTrained = period.filter(p => p !== 0).length;
    const sum = period.reduce((a,b) => a + b, 0);
    const averageExerc = sum / period.length;
    if(target <= averageExerc) {
      isSuccess = true;
    } else {
      isSuccess = false;
    }

    if(daysTrained > 5 && isSuccess === true) {
      ratingInt = 3;
      ratingString = 'Well done, you have improved yourself!';
    } 
    else if (daysTrained > 5 && isSuccess === false) {
      ratingInt = 2;
      ratingString = 'Not too bad, but could be better';
    }
    else if(daysTrained <= 5 && daysTrained > 2 && isSuccess === true) {
      ratingInt = 2;
      ratingString = 'Not too bad, but could be better';
    }

    else {
      ratingInt = 1;
      ratingString = 'Weak, you have much to improve!';
    }

      return {
        periodLenght: period.length,
        trainingDays: daysTrained,
        success: isSuccess,
        rating: ratingInt,
        ratingDescription: ratingString,
        target: target,
        average: averageExerc
      };

};

if(process.argv[1].includes('exerciseCalculator.ts')) {
  try {
    const { target, period } = parseArguments(process.argv);
    console.log(calculateExercises(target, period));
  } catch (e: unknown) {
    if(e instanceof Error) {
      console.log('Error, something went wrong: ', e.message);
    } else {
      console.error('Something really bad happened');
    }
  }
} else {
  console.log('Running as a Server')
}