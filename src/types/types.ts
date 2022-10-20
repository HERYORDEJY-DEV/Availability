export type AvailabilityTypes = {
  time: number;
  jobLength: number;
  date: string;
  availability: number[];
};

export enum SlotLogicTitle {
  FULL = 'Full',
  SELECTED = 'Selected',
  AVAILABLE = 'Available',
  UNAVAILABLE = 'Unavailable',
}

export enum SlotLogicColor {
  FULL = 'red',
  SELECTED = 'green',
  AVAILABLE = 'white',
  UNAVAILABLE = '#CCCCCC',
}
