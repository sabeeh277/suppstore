import React, {useState, useEffect} from 'react';
import {FlatList, View, Text, ActivityIndicator} from 'react-native';
import BrandItem from '../components/BrandItem';
import firestore from '@react-native-firebase/firestore';

let lastDoc = null;
let count = 1;

const buildQuery = () => {
  if (lastDoc == null) {
    return firestore().collection('brands').limit(10).orderBy('name');
  } else {
    return firestore()
      .collection('brands')
      .limit(10)
      .orderBy('name')
      .startAfter(lastDoc);
  }
};

const Brand = ({navigation}) => {
  const [brands, setBrands] = useState([]);
  const [paginate, setPaginate] = useState(1);
  const [loading, setLoading] = useState(true);
  const [footer, setFooter] = useState(true);

  useEffect(() => {
    buildQuery()
      .get()
      .then((querySnapshot) => {
        if (querySnapshot.size > 0) {
          lastDoc = querySnapshot.docs[querySnapshot.size - 1];
          let brandss = [];
          querySnapshot.docs.forEach((document) => {
            brandss.push({
              ...document.data(),
              key: document.id,
            });
          });

          if (brands.length > 0) {
            brandss = [...brands, ...brandss];
          }

          setBrands(brandss);
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
      <BrandItem
        name={item.name}
        count={item.count}
        onPress={() => navigation.navigate('Products', item)}
      />
    );
  };

  const renderFooter = () => {
    if (footer && brands.length > 0) {
      return (
        <ActivityIndicator
          color="#7b1fa2"
          style={{
            paddingTop: 10,
            paddingBottom: 20,
          }}
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
      style={{
        flex: 1,
        paddingVertical: 6,
        backgroundColor: 'white',
      }}
      data={brands}
      renderItem={renderItem}
      ListFooterComponent={renderFooter}
    />
  );
};

export default Brand;
