import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default function App() {
  const [dSeconds, setDSeconds] = useState(0);
  const [active, setActive] = useState(false);

  /**
   * Since active is a dependency, the useEffect function
   * will be called everytime its value changes
   */
  useEffect(() => {
    if (active) {
      const interval = setInterval(() => setDSeconds(prevDSeconds => prevDSeconds + 1), 100);
      return (() => clearInterval(interval)); // return a function to clear the interval
    }
  }, [active]);

  return (
    <View style={styles.container}>
      <Text style={styles.watch}>{(dSeconds/10).toFixed(1)}</Text>
      <View style={styles.buttonsContainer}>

        {/* Change active value (this will trigger the useEffect function) */}
        <Button title={active ? 'Stop' : 'Start'} onPress={() => setActive(prevActive => !prevActive)} />

        {/**
         * Set active to false and dSeconds to 0.
         * The setter functions return no value (will evaluate to false),
         * so the || keeps looking for true and keeps calling the functions.
         */}
        <Button title="Reset" onPress={() => setActive(false) || setDSeconds(0)} />
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'column',
    padding: 20,
  },
  buttonsContainer: {
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  watch: {
    fontSize: 80,
    textAlign: 'center',
  },
});
