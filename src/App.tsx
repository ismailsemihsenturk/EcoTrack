import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import store from './store/index'
import { Provider } from 'react-redux'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator,StackNavigationProp  } from '@react-navigation/stack';
import Layout from './_layout';
import { RootStackParamList } from './types/interfaces';
import Home from './screens/Home';
import Profile from './screens/Profile';
import Calculator from './screens/Calculator';
import Badgets from './screens/Badgets';


const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <SafeAreaProvider>
          <Stack.Navigator>
            <Stack.Screen name="Home" options={{ headerShown: false }}>
              {(props) => (
                <Layout {...props}>
                  <Home children={undefined} {...props} />
                </Layout>
              )}
            </Stack.Screen>
            <Stack.Screen name="Calculator" options={{ headerShown: false }}>
              {(props) => (
                <Layout {...props}>
                  <Calculator {...props} />
                </Layout>
              )}
            </Stack.Screen>
            <Stack.Screen name="Badgets" options={{ headerShown: false }}>
              {(props) => (
                <Layout {...props}>
                  <Badgets {...props} />
                </Layout>
              )}
            </Stack.Screen>
            <Stack.Screen name="Profile" options={{ headerShown: false }}>
              {(props) => (
                <Layout {...props}>
                  <Profile {...props} />
                </Layout>
              )}
            </Stack.Screen>
          </Stack.Navigator>
        </SafeAreaProvider>
      </NavigationContainer>
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
