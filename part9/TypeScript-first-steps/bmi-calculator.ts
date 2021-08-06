interface BmiIndexValues {
  height: number;
  weight: number;
}


const checkArguments = (
  args: Array<string>
  ): BmiIndexValues => {
    if (args.length < 4) throw new Error('Not enought arguments');
    if (args.length > 4) throw new Error('Too many arguments');

    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
      return {
        height: Number(args[2]),
        weight: Number(args[3])
      };
    } else {
      throw new Error('Provided values were not numbers!');
    }
  };


export const calculateBmi = (a: number, b:number) => {
  a = a / 100;
  if (b / (a*a) < 18.5) {
    return 'Underweight (Unhealthy Weight)';
  } else if (b / (a*a) >= 18.5 && b / (a*a) < 25) {
    return 'Normal (Healthy Weight)';
  } else {
    return 'Overweight (Unhealthy Weight)';
  }
};

if(process.argv[1].includes('bmi-calculator.ts')) {
  try {
    const { height, weight } = checkArguments(process.argv);
    console.log(calculateBmi(height, weight));
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