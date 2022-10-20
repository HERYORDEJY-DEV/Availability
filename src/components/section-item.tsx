import React, {useEffect, useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {AvailabilityTypes, SlotLogicTitle} from '../types/types';

const CURRENT_DATE = '2016-05-18T11:27:00';
const MAX_JOB_LENGTH_HOURS = 5;
const MIN_JOB_LENTH_HOURS = 1;
const AVAILABILITY = [9, 10, 11, 12, 13, 14, 17];
const WORK_START_HOUR = 6;
const WORK_END_HOUR = 18;

type time = {
  start: string;
  end: string;
  startHour: number;
  id: string;
  status: string;
};

interface Props {
  // time: [string, string];
  time: time;
  status: string;
  index: number;
  hoursAvailable: number[];
  jobLength: number;
}

const getSlotColor = (status: string | boolean) => {
  switch (status) {
    case SlotLogicTitle.FULL:
      return 'red';

    case SlotLogicTitle.SELECTED || status === true:
      return 'green';

    case SlotLogicTitle.AVAILABLE:
      return '#FFFFFF';

    case SlotLogicTitle.UNAVAILABLE:
      return '#CCCCCC';

    default:
      return 'transparent';
  }
};

export default function SectionItem(props: Props) {
  const [state, setState] = useState({
    selected: false,
    status: props.time.status,
  });

  const backgroundColor = getSlotColor(state.status || state.selected);
  const slotLength = props.hoursAvailable.length;
  const firstSlot = props.hoursAvailable[0];
  const lastSlot = props.hoursAvailable[slotLength - 1];
  const {startHour} = props.time;
  const hourIndex = props.hoursAvailable.findIndex(h => h == startHour);

  function checkSlotAvailability() {
    if (!props.hoursAvailable.includes(startHour)) {
      setState(prev => ({...prev, status: SlotLogicTitle.FULL}));
      return;
    }
    if (hourIndex + Number(props.jobLength) > slotLength) {
      setState(prev => ({...prev, status: SlotLogicTitle.UNAVAILABLE}));
      return;
    }
    setState(prev => ({...prev, status: SlotLogicTitle.AVAILABLE}));
  }

  const onSelectSlot = () => {
    if (!state.selected && state.status === SlotLogicTitle.AVAILABLE) {
      setState(prev => ({
        ...prev,
        selected: !prev.selected,
        status: SlotLogicTitle.AVAILABLE,
      }));
    }
  };

  console.log(
    '\n\nstate\t',
    startHour,
    hourIndex,
    props.jobLength,
    slotLength,
    hourIndex + Number(props.jobLength),
  );

  useEffect(() => {
    checkSlotAvailability();
  }, [props.jobLength]);

  return (
    <View style={styles.container}>
      <View style={styles.timeContainer}>
        <Text style={styles.title}>
          {props.time.start} - {props.time.end}
        </Text>
      </View>
      <Pressable
        style={[styles.statusContainer, {backgroundColor}]}
        onPress={onSelectSlot}>
        <Text
          style={[
            styles.status,
            {
              color:
                props.status !== ('Available' || 'Unavailable')
                  ? '#FFFFFF'
                  : '#000000',
            },
          ]}>
          {state.status}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderColor: '#DDDDDD',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    backgroundColor: '#EEEEEE',
    flexDirection: 'row',
  },
  timeContainer: {flex: 0.4, padding: 20},
  statusContainer: {flex: 0.6, padding: 20},
  title: {
    // fontFamily: 'Roboto-Regulr',
    fontSize: 20,
    color: '#000000',
  },
  status: {
    // fontFamily: 'Roboto-Regulr',
    fontSize: 20,
    color: '#000000',
    textAlign: 'center',
  },
});
