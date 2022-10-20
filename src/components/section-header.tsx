import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

interface Props {
  title: string;
}

export default function SectionHeader(props: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{props.title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    borderColor: '#DDDDDD',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    backgroundColor: '#000000',
  },
  title: {
    // fontFamily: 'Roboto-Regulr',
    fontSize: 20,
    color: '#FFFFFF',
  },
});
