import type { IStop } from '@/types';
import { writable } from 'svelte/store';

function createStops() {
  const { subscribe, set, update } = writable<IStop[]>();

  return {
    subscribe,
    updateStops: (stops: IStop[]) => {
      set(stops);
    }
  };
}

const stops = createStops;

export default stops;
