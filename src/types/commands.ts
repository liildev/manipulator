export interface CommandState {
  originalCommand: string;
  optimizedCommand: string;
  executionStatus: CommandStatus;
  animationSpeed: number;
  manipulatorPosition: ManipulatorPosition;
  samples: Sample[];
  hasPickedSample: boolean;
  history: HistoryEntry[];
  currentStep: number;
  isAnimating: boolean;
}

export type CommandChar = 'Л' | 'П' | 'В' | 'Н' | 'О' | 'Б';

export type CommandStatus = 'idle' | 'executing' | 'completed' | 'error';

export interface ManipulatorPosition {
  x: number;
  y: number;
}

export interface Sample {
  id: string;
  x: number;
  y: number;
  isPickedUp: boolean;
}

export interface GridState {
  manipulatorPosition: ManipulatorPosition;
  samples: Sample[];
  hasPickedSample: boolean;
}

export interface HistoryEntry {
  id: string;
  originalCommand: string;
  optimizedCommand: string;
  timestamp: number;
  initialState: GridState;
  finalState: GridState;
}
