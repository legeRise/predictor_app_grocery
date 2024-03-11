// Import necessary dependencies
import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert, Text} from 'react-native';

// Define the AddProductScreen component
const AddProductScreen = ({ navigation }) => {
  // State variables to hold input field values
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productDesc, setProductDesc] = useState('');

  // go to viewProduct page (navigator function)
  const viewProductsPage = () => {
    navigation.navigate('viewProducts');
  };
  // Function to handle button click
  const handleAddProduct = async () => {
    try {
      // Make API call to add product
      const response = await fetch('http://54.151.177.70:8000/add_product/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          product_name: productName,
          product_price: productPrice,
          product_desc: productDesc,
        }),
      });

      // Check response status
      if (response.ok) {
        // Product added successfully
        Alert.alert('Success', 'Product added successfully');
        // Clear input fields
        setProductName('');
        setProductPrice('');
        setProductDesc('');
      } else {
        // Error adding product
        Alert.alert('Error', 'Failed to add product');
      }
    } catch (error) {
      console.error('Error adding product:', error);
      Alert.alert('Error', 'Something went wrong');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>View Products</Text>

      <TextInput
        placeholder="Product Name"
        value={productName}
        onChangeText={setProductName}
        style={styles.input}
      />
      <TextInput
        placeholder="Product Price"
        value={productPrice}
        onChangeText={setProductPrice}
        keyboardType="numeric"
        style={styles.input}
      />
      <TextInput
        placeholder="Product Description"
        value={productDesc}
        onChangeText={setProductDesc}
        multiline
        numberOfLines={4}
        style={styles.input}
      />


      <View style={styles.buttonContainer}>
        <Button title="Add Product" onPress={handleAddProduct} />
        <Button title="View All Products" onPress={viewProductsPage} />
      </View>

    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  input: {
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  title: {
    marginTop: 16,
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
});

// Export the AddProductScreen component
export default AddProductScreen;
