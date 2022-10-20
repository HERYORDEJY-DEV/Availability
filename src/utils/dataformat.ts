import {SlotLogicTitle} from '../types/types';

type DataType = {
  Date: string;
  HoursAvailable: number[];
};

type DataReturnType = {
  title: string;
  data: [string, string][];
  hoursAvailable: number[];
};

export const getDataFormat = (data: DataType[]) => {
  const _data = data.map((item, index) => ({
    title: item.Date,
    data: [
      ['9:00', '10:00'],
      ['10:00', '11:00'],
      ['11:00', '12:00'],
      ['12:00', '13:00'],
      ['13:00', '14:00'],
    ],
    hoursAvailable: item.HoursAvailable,
  }));
  return [..._data];
};

export const getDataFormatPlus = (data: DataType[]) => {
  const _data = data.map((item, index) => ({
    title: item.Date,
    data: [
      {
        start: '9:00',
        end: '10:00',
        startHour: 9,
        id: `${item.Date}-9`,
        status: SlotLogicTitle.UNAVAILABLE,
      },
      {
        start: '10:00',
        end: '11:00',
        startHour: 10,
        id: `${item.Date}-10`,
        status: SlotLogicTitle.UNAVAILABLE,
      },
      {
        start: '11:00',
        end: '12:00',
        startHour: 11,
        id: `${item.Date}-11`,
        status: SlotLogicTitle.UNAVAILABLE,
      },
      {
        start: '12:00',
        end: '13:00',
        startHour: 12,
        id: `${item.Date}-12`,
        status: SlotLogicTitle.UNAVAILABLE,
      },
      {
        start: '13:00',
        end: '14:00',
        startHour: 13,
        id: `${item.Date}-13`,
        status: SlotLogicTitle.UNAVAILABLE,
      },
    ],
    hoursAvailable: item.HoursAvailable,

    id: item.Date,
  }));
  return [..._data];
};
