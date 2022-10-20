/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useState} from 'react';
import {
  SafeAreaView,
  SectionList,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

import DATA from '../../data.json';

import {Slider} from '@miblanchard/react-native-slider';
import {AvailabilityTypes, SlotLogicTitle} from '../types/types';
import {getDataFormat, getDataFormatPlus} from '../utils/dataformat';
import SectionHeader from '../components/section-header';
import SectionItem from '../components/section-item';

const Home: React.FC = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [state, setState] = useState([...getDataFormatPlus(DATA)]);

  const [jobLength, setJobLength] = useState(0);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  // const SectionData = getDataFormat(DATA);

  function checkSlotAvailability() {
    let data = [...state];
    for (let i = 0; i < data.length; i++) {
      let item = state[i];
      const slotLength = item.hoursAvailable.length;
      const firstSlot = item.hoursAvailable[0];
      const lastSlot = item.hoursAvailable[slotLength - 1];
      const hoursAvailable = item.hoursAvailable;
      let data = item.data;
      for (let j = 0; j < data.length; j++) {
        let itemData = data[j];
        const {status, startHour, start, id, end} = itemData;
        const hourIndex = item.hoursAvailable.findIndex(h => h == startHour);

        if (!hoursAvailable.includes(startHour)) {
          // setState(prev => ({...prev, status: SlotLogicTitle.FULL}));
          itemData = {...itemData, status: SlotLogicTitle.FULL};
          return itemData;
        }
        if (hourIndex + Number(jobLength) > slotLength) {
          // setState(prev => ({...prev, status: SlotLogicTitle.UNAVAILABLE}));
          itemData = {...itemData, status: SlotLogicTitle.UNAVAILABLE};
          return itemData;
        }
        // setState(prev => ({...prev, status: SlotLogicTitle.AVAILABLE}));
        itemData = {...itemData, status: SlotLogicTitle.AVAILABLE};
      }
    }
  }

  const SectionData = checkSlotAvailability();
  console.log('SectionData :>> ', SectionData);

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <View style={styles.sliderContainer}>
        <Text style={styles.sliderValue}>{jobLength}HR/s</Text>
        <Slider
          value={jobLength}
          onValueChange={value => setJobLength(Number(value))}
          maximumValue={5}
          minimumValue={1}
          step={1}
        />
      </View>
      <SectionList
        contentInsetAdjustmentBehavior="automatic"
        style={[backgroundStyle, styles.listContainer]}
        sections={[...state]}
        renderItem={({section: {data, hoursAvailable}, index}) => (
          <SectionItem
            // time={data[index] as [string, string]}
            time={data[index] as {}}
            index={index}
            status={SlotLogicTitle.AVAILABLE}
            hoursAvailable={hoursAvailable}
            jobLength={jobLength}
          />
        )}
        renderSectionHeader={({section: {title}}) => (
          <SectionHeader title={title} />
        )}
        keyExtractor={(_, index) => `${index}`}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {},
  sliderValue: {textAlign: 'center', fontWeight: 'bold', fontSize: 20},
  sliderContainer: {margin: 20},
  listContainer: {
    height: '100%',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default Home;
