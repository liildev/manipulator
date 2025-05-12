import type { CommandState, HistoryEntry } from '@/types/commands';

import { type PayloadAction, createSlice } from '@reduxjs/toolkit';

import { generateRandomSamples } from '@/shared/grid-utils';
import { optimizeCommand } from '@/shared/command-optimizer';
import { KEYS, storage } from '@/shared/utils';

const initialSamples = generateRandomSamples(5);

const initialState: CommandState = {
  originalCommand: '',
  optimizedCommand: '',
  executionStatus: 'idle',
  animationSpeed: 500,
  manipulatorPosition: { x: 0, y: 0 },
  samples: initialSamples,
  hasPickedSample: false,
  history: storage.getItem(KEYS.history) ?? [],
  currentStep: 0,
  isAnimating: false,
};

const commandSlice = createSlice({
  name: 'command',
  initialState,
  reducers: {
    setOriginalCommand: (state, action: PayloadAction<string>) => {
      state.originalCommand = action.payload;
      state.optimizedCommand = optimizeCommand(action.payload);
    },
    setAnimationSpeed: (state, action: PayloadAction<number>) => {
      state.animationSpeed = action.payload;
    },
    startExecution: (state) => {
      state.executionStatus = 'executing';
      state.currentStep = 0;
      state.isAnimating = true;
    },
    completeExecution: (state) => {
      state.executionStatus = 'completed';
      state.isAnimating = false;

      const historyEntry: HistoryEntry = {
        id: Date.now().toString(),
        originalCommand: state.originalCommand,
        optimizedCommand: state.optimizedCommand,
        timestamp: Date.now(),
        initialState: {
          manipulatorPosition: { x: 0, y: 0 },
          samples: initialSamples,
          hasPickedSample: false,
        },
        finalState: {
          manipulatorPosition: { ...state.manipulatorPosition },
          samples: [...state.samples],
          hasPickedSample: state.hasPickedSample,
        },
      };

      state.history.unshift(historyEntry);

      storage.setItem(KEYS.history, state.history);
    },
    resetExecution: (state) => {
      state.executionStatus = 'idle';
      state.manipulatorPosition = { x: 0, y: 0 };
      state.samples = generateRandomSamples(5);
      state.hasPickedSample = false;
      state.currentStep = 0;
      state.isAnimating = false;
    },
    moveManipulator: (
      state,
      action: PayloadAction<{ x: number; y: number }>,
    ) => {
      state.manipulatorPosition.x += action.payload.x;
      state.manipulatorPosition.y += action.payload.y;
    },
    pickupSample: (state) => {
      const { x, y } = state.manipulatorPosition;
      const sampleIndex = state.samples.findIndex(
        (sample) => sample.x === x && sample.y === y && !sample.isPickedUp,
      );

      if (sampleIndex !== -1 && !state.hasPickedSample) {
        state.samples[sampleIndex].isPickedUp = true;
        state.hasPickedSample = true;
      }
    },
    dropSample: (state) => {
      if (state.hasPickedSample) {
        const pickedSampleIndex = state.samples.findIndex(
          (sample) => sample.isPickedUp,
        );

        if (pickedSampleIndex !== -1) {
          state.samples[pickedSampleIndex].x = state.manipulatorPosition.x;
          state.samples[pickedSampleIndex].y = state.manipulatorPosition.y;
        }
        state.hasPickedSample = false;
      }
    },
    incrementStep: (state) => {
      state.currentStep += 1;
    },
    clearHistory: (state) => {
      state.history = [];
      storage.removeItem(KEYS.history);
    },
  },
});

export const {
  setOriginalCommand,
  setAnimationSpeed,
  startExecution,
  completeExecution,
  resetExecution,
  moveManipulator,
  pickupSample,
  dropSample,
  incrementStep,
  clearHistory,
} = commandSlice.actions;

export const commandReducer = commandSlice.reducer;
