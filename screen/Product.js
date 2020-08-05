import React, {useState, useEffect} from 'react';
import {
  FlatList,
  BackHandler,
  View,
  Text,
  ActivityIndicator,
} from 'react-native';
import {HeaderBackButton} from '@react-navigation/stack';
import firestore from '@react-native-firebase/firestore';
import ProductItem from '../components/ProductItem';

let lastDoc = null;
let count = 1;

const buildQuery = (name) => {
  if (lastDoc == null) {
    return firestore()
      .collection('products')
      .where('brand', '==', name)
      .limit(10);
  } else {
    return firestore()
      .collection('products')
      .where('brand', '==', name)
      .limit(10)
      .startAfter(lastDoc);
  }
};

export default function Product({route, navigation}) {
  const [products, setProducts] = useState([]);
  const [paginate, setPaginate] = useState(1);
  const [footer, setFooter] = useState(true);
  const [loading, setLoading] = useState(true);

  const backAction = () => {
    lastDoc = null;
    count = 1;
    navigation.goBack();
    return true;
  };

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => {
        return (
          <HeaderBackButton
            onPress={() => {
              lastDoc = null;
              count = 1;
              navigation.goBack();
            }}></HeaderBackButton>
        );
      },
    });

    BackHandler.addEventListener('hardwareBackPress', backAction);
    return () =>
      BackHandler.removeEventListener('hardwareBackPress', backAction);
  }, []);

  useEffect(() => {
    buildQuery(route.params.name)
      .get()
      .then((querySnapshot) => {
        if (querySnapshot.size > 0) {
          lastDoc = querySnapshot.docs[querySnapshot.size - 1];
          let productss = [];
          querySnapshot.docs.forEach((document) => {
            productss.push({
              ...document.data(),
              key: document.id,
            });
          });

          if (products.length > 0) {
            productss = [...products, ...productss];
          }

          setProducts(productss);
          setLoading(false);
        } else {
          setLoading(false);
          setFooter(false);
        }
      })
      .catch((error) => console.log(error));
  }, [paginate]);

  const renderItem = ({item}) => {
    return (
      <ProductItem
        name={item.name}
        price={item.price}
        reviews={item.reviews}
        rating={item.rating}
        image={item.image}
        flavor={item.flavor}
        onPress={() => navigation.navigate('Product Details', item)}
      />
    );
  };

  const renderFooter = () => {
    if (footer && products.length > 0) {
      return (
        <ActivityIndicator
          color="#7b1fa2"
          style={{paddingTop: 10, paddingBottom: 20}}
          animating={loading}
        />
      );
    } else {
      return null;
    }
  };

  const onEndReached = () => {
    setLoading(true);
    setPaginate(++count);
  };

  const renderEmpty = () => {
    return (
      <View
        style={{
          flex: 1,
          padding: 50,
        }}>
        <Text
          style={{
            padding: 10,
            fontSize: 18,
            fontStyle: 'italic',
            textAlign: 'center',
          }}>
          We are fetching results for you ...
        </Text>
        <ActivityIndicator color="#7b1fa2" style={{padding: 10}} />
      </View>
    );
  };

  return (
    <FlatList
      onEndReachedThreshold={0.5}
      onEndReached={onEndReached}
      removeClippedSubviews={true}
      ListEmptyComponent={renderEmpty}
      style={{flex: 1, paddingVertical: 6, backgroundColor: 'white'}}
      data={products}
      renderItem={renderItem}
      ListFooterComponent={renderFooter}
    />
  );
}
