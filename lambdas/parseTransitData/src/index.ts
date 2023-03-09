import * as dotenv from 'dotenv';

if (process.env.NODE_ENV === 'development') {
  dotenv.config();
}

import parseTransitData from './parseTransitData';

// @ts-ignore
const main = async (event, context, callback) => {
  try {
    await parseTransitData();

    return {
      status: 200,
    };
  } catch (error) {
    console.log(error);
    return {
      error,
    };
  }
};

export const handler = main;
