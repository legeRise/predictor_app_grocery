import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity,Button } from 'react-native';

const AllProductScreen = ({ navigation }) => {
  const [products, setProducts] = useState([]);

  // Fetch products (simulated data for now)
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://54.151.177.70:8000/list_products/');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        const productsArray = Object.values(data);
        setProducts(productsArray);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);



  // Function to navigate to detailed view screen when a product card is pressed
  const navigateToDetailedView = (product) => {
    navigation.navigate('detailedView', { product });
  };

  // Function to navigate to detailed view screen when a product card is pressed
  const addNewProduct = () => {
    navigation.navigate('addProduct');
  };

  return (
      <ScrollView contentContainerStyle={styles.container}>

      <Text style={styles.title}>View Products</Text>

        <TouchableOpacity style={styles.button} onPress={addNewProduct}>
        <Text style={styles.buttonText}>Add New Product</Text>
        </TouchableOpacity>

      <View style={styles.productsContainer}>
        {products.map((product, index) => (
          <TouchableOpacity
            key={product.product_id}
            style={styles.productWrapper}
            onPress={() => navigateToDetailedView(product)}
          >
            <Text style={styles.productName}>{product.product_name}</Text>
            <Text style={styles.productPrice}>{product.product_price}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    marginTop: 16,
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  productsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  productWrapper: {
    width: '48%', // Adjust width as needed
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    elevation: 3, // For Android shadow
    shadowColor: '#000', // For iOS shadow
    shadowOffset: { width: 0, height: 2 }, // For iOS shadow
    shadowOpacity: 0.25, // For iOS shadow
    shadowRadius: 3.84, // For iOS shadow
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  productPrice: {
    fontSize: 16,
    color: '#888',
  },
  button: {
    backgroundColor: 'green', // Example background color
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10
  },
  buttonText: {
    color: 'white', // Example text color
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  }
});

export default AllProductScreen;