import {StyleSheet, View} from 'react-native';
import React from 'react';

const Card = (props) => {
  return (
    <View style={styles.container}>
      <View style={{padding: 12}}>{props.children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    elevation: 3,
    backgroundColor: 'white',
    marginVertical: 6,
    marginHorizontal: 10,
    borderRadius: 8,
  },
});

export default Card;
