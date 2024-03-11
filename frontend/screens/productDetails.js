import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';
import ModalSelector from 'react-native-modal-selector';

const DetailedViewScreen = ({ route, navigation }) => {
  const { product_name, product_price, product_desc } = route.params.product;
  const [isPredictButtonEnabled, setIsPredictButtonEnabled] = useState(false);
  const [selectedTimePeriod, setSelectedTimePeriod] = useState('Select Time Period');
  const [expectedSales, setExpectedSales] = useState('');
  const [message, setMessage] = useState('');
  const [availableModels, setAvailableModels] = useState([]);

  useEffect(() => {
    const fetchModels = async () => {
      try {
        const response = await fetch('http://54.151.177.70:8000/list_models');
        if (response.ok) {
          const data = await response.json();
          const modelNames = data.available_models;
          setAvailableModels(modelNames);
          console.log(modelNames); // This will log the updated model names
        } else {
          console.error('Failed to fetch models:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching models:', error);
      }
    };

    fetchModels();
  }, []);

  useEffect(() => {
    // Check if the product name exists in the available models array
    if (availableModels.includes(product_name)) {
      setIsPredictButtonEnabled(true);
    } else {
        setMessage('Predictor Not Yet Available for this Product')
        setIsPredictButtonEnabled(false);
    }
  }, [availableModels, product_name]);

  const handlePredictSales = async () => {
    try {
      const response = await fetch(`http://54.151.177.70:8000/model/${product_name}_predict/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          price: product_price,
          fuel_price: 100, // Change this to your desired value
          time_period: selectedTimePeriod,
        }),
      });
      if (response.ok) {
        const data = await response.json();
        console.log('Prediction:', data.expected_sales);
        setExpectedSales(data.expected_sales)
        // Handle further actions if needed
      } else {
        Alert.alert('Success', 'Please Selected a Time Period');
        console.error('Failed to make prediction:', response.statusText);
      }
    } catch (error) {
      console.error('Error predicting sales:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Product: {product_name}</Text>

      <Text style={styles.label}>Name:</Text>
      <Text style={styles.value}>{product_name}</Text>

      <Text style={styles.label}>Price:</Text>
      <Text style={styles.value}>{product_price}</Text>

      <Text style={styles.label}>Description:</Text>
      <Text style={styles.value}>{product_desc}</Text>

      <ModalSelector
  data={[
    { key: 'daily', label: 'Daily' },
    { key: 'weekly', label: 'Weekly' },
    { key: 'monthly', label: 'Monthly' },
  ]}
  initValue='Select Time Period'
  selectedKey={selectedTimePeriod}
  style={styles.modalSelector}
  selectStyle={styles.selectedModalOption} // Add this line
  onChange={(option) => setSelectedTimePeriod(option.key)}
/>

      <Button
        title="Predict Sales"
        onPress={handlePredictSales}
        disabled={!isPredictButtonEnabled}
      />
      {!isPredictButtonEnabled && <Text style={styles.error}>{message}</Text>}
      {expectedSales  && <Text style={styles.label}>Expected Sales: {expectedSales}</Text>}


    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    marginTop: 16,
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  value: {
    fontSize: 16,
    marginBottom: 15,
  },
  error: {
    color: 'red', // Error message color
    fontSize: 14,
    textAlign: 'center',
    marginTop: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
});

export default DetailedViewScreen;
