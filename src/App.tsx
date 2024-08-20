import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import store from './store/index'
import { Provider } from 'react-redux'
import { Counter } from './features/Counter';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Layout from './_layout';

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <Layout>
          <View style={styles.container}>
            <Text>Open up App.tsx to start working on your app!</Text>
            <StatusBar style="auto" />
          </View>
        </Layout>
      </SafeAreaProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
