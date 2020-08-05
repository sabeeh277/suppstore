import {View, StyleSheet, Text} from 'react-native';
import React from 'react';
import Card from './Card';
import FastImage from 'react-native-fast-image';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {TouchableOpacity} from 'react-native-gesture-handler';

const ProductItem = ({
  onPress,
  image,
  name,
  flavor,
  reviews,
  price,
  rating,
}) => {
  return (
    <Card>
      <TouchableOpacity onPress={onPress}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <FastImage
            style={styles.image}
            source={{uri: image}}
            resizeMode={FastImage.resizeMode.contain}
          />
          <View style={{marginHorizontal: 14, marginVertical: 8, flex: 1}}>
            <Text
              ellipsizeMode="tail"
              numberOfLines={1}
              style={styles.productName}>
              {name}
            </Text>
            <Text style={styles.productFlavor}>{flavor}</Text>
            <Text style={styles.producPrice}>{price}</Text>
            <View style={{flexDirection: 'row'}}>
              <View style={styles.container}>
                <MaterialIcons
                  name="rate-review"
                  size={14}
                  color="blueviolet"
                />
              </View>
              <Text style={styles.productReviews}>{reviews} Reviews</Text>

              <View style={styles.container}>
                <FontAwesome name="star" size={14} color="gold" />
              </View>
              <Text style={styles.productRating}>{rating} Ratings</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 5,
  },
  image: {height: 90, width: 60, resizeMode: 'contain'},
  productName: {
    fontSize: 16,
    color: '#7b1fa2',
    fontFamily: 'sans-serif-medium',
  },
  productFlavor: {
    fontStyle: 'italic',
    fontSize: 13,
    fontFamily: 'sans-serif-medium',
  },
  producPrice: {
    fontSize: 14,
    fontFamily: 'monospace',
    marginBottom: 2,
    fontWeight: 'bold',
  },
  productRating: {
    fontSize: 13,
    fontFamily: 'sans-serif-medium',
  },
  productReviews: {
    fontSize: 13,
    fontFamily: 'sans-serif-medium',
    marginRight: 10,
  },
});

export default ProductItem;
