import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';
import Card from '../components/Card';
import {WebView} from 'react-native-webview';
import {ScrollView} from 'react-native-gesture-handler';

const ProductDetail = ({route}) => {
  return (
    <ScrollView>
      <Card>
        <View
          style={{margin: 5, justifyContent: 'center', alignItems: 'center'}}>
          <FastImage
            style={styles.image}
            source={{uri: route.params.image}}
            resizeMode={FastImage.resizeMode.contain}
          />
          <Text style={styles.productName}>{route.params.name}</Text>
          <Text style={styles.producDesc}>{route.params.descShort}</Text>
        </View>

        <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Text
              style={{
                color: '#7b1fa2',
                fontSize: 16,
                fontWeight: 'bold',
                padding: 10,
              }}>
              Category
            </Text>
            <Text style={styles.productCategory}>{route.params.category}</Text>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Text
                style={{
                  color: '#7b1fa2',
                  fontSize: 16,
                  fontWeight: 'bold',
                  padding: 10,
                }}>
                Reviews
              </Text>
              <Text style={styles.productReviews}>{route.params.reviews}</Text>
            </View>
          </View>

          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Text
              style={{
                color: '#7b1fa2',
                fontSize: 16,
                fontWeight: 'bold',
                padding: 10,
              }}>
              Flavor
            </Text>
            <Text style={styles.productFlavor}>{route.params.flavor}</Text>

            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Text
                style={{
                  color: '#7b1fa2',
                  fontSize: 16,
                  fontWeight: 'bold',
                  padding: 10,
                }}>
                Rating
              </Text>
              <Text style={styles.productRating}>{route.params.rating}</Text>
            </View>
          </View>
        </View>

        <View style={{height: 400}}>
          <WebView
            source={{html: route.params.ingredientsHTML}}
            style={{marginTop: 20}}
          />
        </View>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  image: {height: 150, width: 150, resizeMode: 'contain', marginBottom: 10},
  productName: {
    textAlign: 'center',
    color: '#7b1fa2',
    fontSize: 18,
    letterSpacing: 0.25,
    fontWeight: 'bold',
  },
  productFlavor: {
    fontSize: 14,
    letterSpacing: 0.15,
    fontWeight: 'bold',
    marginBottom: 2,
  },

  producDesc: {
    fontSize: 14,
    textAlign: 'center',
    padding: 10,
    fontStyle: 'italic',
    letterSpacing: 0.15,
    fontWeight: 'bold',
  },

  productCategory: {
    fontSize: 14,
    marginBottom: 2,
    letterSpacing: 0.15,
    fontWeight: 'bold',
  },

  productRating: {
    fontSize: 14,
    letterSpacing: 0.15,
    fontWeight: 'bold',
  },
  productReviews: {
    fontSize: 14,
    marginBottom: 2,
    letterSpacing: 0.15,
    fontWeight: 'bold',
  },
});

export default ProductDetail;
