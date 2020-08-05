import {StyleSheet, View, Text} from 'react-native';
import React from 'react';
import Card from './Card';
import Entypo from 'react-native-vector-icons/Entypo';
import {TouchableOpacity} from 'react-native-gesture-handler';

const BrandItem = ({onPress, name, count}) => {
  return (
    <Card>
      <TouchableOpacity onPress={onPress}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View>
            <Text style={styles.brandName}>{name}</Text>
            <Text style={styles.brandCount}>{count}</Text>
          </View>
          <Entypo name="chevron-right" color="#7b1fa2" size={18} />
        </View>
      </TouchableOpacity>
    </Card>
  );
};

const styles = StyleSheet.create({
  brandName: {
    fontSize: 16,
    color: '#7b1fa2',
    marginBottom: 2,
    fontFamily: 'sans-serif-medium',
  },
  brandCount: {
    fontFamily: 'sans-serif-medium',
    color: '#404040',
    fontSize: 14,
  },
});

export default BrandItem;
