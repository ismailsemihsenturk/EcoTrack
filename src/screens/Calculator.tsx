import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { DailyFootprint, RootStackParamList, RootState } from '../types/interfaces';
import { useAppDispatch, useAppSelector } from '../utils/hooks';
import { addFootprintAndCalculate } from '../features/carbonSlice';

interface CalculatorScreenProps {
  navigation: StackNavigationProp<RootStackParamList, 'Calculator'>;
}

const Calculator: React.FC<CalculatorScreenProps> = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state: RootState) => state.user);
  const footPrint = useAppSelector((state: RootState) => state.carbon);
  const [transport, setTransport] = useState("");
  const [energy, setEnergy] = useState("");
  const [food, setFood] = useState("");

  const handleCalculate = () => {
    const footprintObj: DailyFootprint = {
      id: user.id,
      transport: Number(transport),
      energy: Number(energy),
      food: Number(food),
      dailyTotalFootprint: Number(transport) + Number(energy) + Number(food),
      date: new Date().toISOString(),
    };
    const paramObj = {
      userId: user.id,
      footprint: footprintObj
    }
    dispatch(addFootprintAndCalculate(paramObj));
    setTransport("")
    setEnergy("")
    setFood("")
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Carbon Footprint Calculator</Text>
      <TextInput
        style={styles.input}
        placeholder="Transport (km)"
        value={transport}
        onChangeText={setTransport}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Energy (kWh)"
        value={energy}
        onChangeText={setEnergy}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Food (kg)"
        value={food}
        onChangeText={setFood}
        keyboardType="numeric"
      />
      <Button title="Calculate" onPress={handleCalculate} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
  },
});

export default Calculator;