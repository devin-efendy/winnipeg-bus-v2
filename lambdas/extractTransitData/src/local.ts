import { handler } from './index';

handler(undefined, undefined, (_: unknown, message: string) => {
  console.log(message);
});

export default handler;
