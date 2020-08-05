import React from 'react';
import 'react-native-gesture-handler';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Brand from './screen/Brand';
import Product from './screen/Product';
import ProductDetail from './screen/ProductDetail';

const Stack = createStackNavigator();

const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Brands">
          <Stack.Screen name="Brands" component={Brand} />
          <Stack.Screen
            name="Products"
            component={Product}
            options={({route}) => ({title: route.params.name})}
          />
          <Stack.Screen
            name="Product Details"
            component={ProductDetail}
            options={({route}) => ({title: route.params.name})}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default App;
