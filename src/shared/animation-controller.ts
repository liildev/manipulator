import type { AppDispatch } from './store';

import { expandCommand } from './command-optimizer';

import {
  completeExecution,
  dropSample,
  incrementStep,
  moveManipulator,
  pickupSample,
} from '@/shared/store/commands-slice';

export function animateManipulator(
  optimizedCommand: string,
  speed: number,
  dispatch: AppDispatch,
) {
  const expandedCommand = expandCommand(optimizedCommand);

  let currentStep = 0;

  const interval = setInterval(() => {
    if (currentStep >= expandedCommand.length) {
      clearInterval(interval);
      dispatch(completeExecution());

      return;
    }

    const command = expandedCommand[currentStep];

    executeCommand(command, dispatch);

    dispatch(incrementStep());
    currentStep++;
  }, speed);

  return () => clearInterval(interval);
}

function executeCommand(command: string, dispatch: AppDispatch) {
  switch (command) {
    case 'Л':
      dispatch(moveManipulator({ x: -1, y: 0 }));
      break;
    case 'П':
      dispatch(moveManipulator({ x: 1, y: 0 }));
      break;
    case 'В':
      dispatch(moveManipulator({ x: 0, y: -1 }));
      break;
    case 'Н':
      dispatch(moveManipulator({ x: 0, y: 1 }));
      break;
    case 'О':
      dispatch(pickupSample());
      break;
    case 'Б':
      dispatch(dropSample());
      break;
    default:
      break;
  }
}
