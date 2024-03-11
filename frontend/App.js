import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";


import AddProductScreen from "./screens/addProduct"
import AllProductScreen from "./screens/allProducts"
import DetailedViewScreen from "./screens/productDetails";



const Stack = createNativeStackNavigator();

const App = () => {
  return (
    
      <NavigationContainer>
        <Stack.Navigator initialRouteName="addProduct">
        <Stack.Screen name="addProduct" component={AddProductScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="viewProducts" component={AllProductScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="detailedView" component={DetailedViewScreen} options={{ headerShown: false }}/>
        
          
        </Stack.Navigator>
      </NavigationContainer>
    
  );
};

export default App;
