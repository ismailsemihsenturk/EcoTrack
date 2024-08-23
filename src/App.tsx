import { StyleSheet, Text, View } from 'react-native';
import store from './store/index'
import { Provider } from 'react-redux'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import Layout from './_layout';
import { CustomUser, RootStackParamList, UserState } from './types/interfaces';
import Home from './screens/Home';
import Profile from './screens/Profile';
import Calculator from './screens/Calculator';
import Badgets from './screens/Badgets';
import { AuthProvider } from './services/authContext';
import { getAuth, onAuthStateChanged, User, signInWithCustomToken } from 'firebase/auth';
import { useEffect, useState } from 'react';
import Login from './screens/login';
import Register from './screens/register';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getUserViaAsyncStorage } from './services/firestore';
import { auth } from '../firebase.config';


const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  const [user, setUser] = useState<CustomUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      const userToken = await AsyncStorage.getItem('userToken');
      const userId = await AsyncStorage.getItem('userId');

      if (userToken && userId) {
        try {
          const user = auth.currentUser;
          console.log("user " + user)
          if (!user) {
            await signInWithCustomToken(auth, userToken);
          }
          const userData = await getUserViaAsyncStorage(userId);
          if (userData) {
            setUser(userData);
          } else {
            throw new Error('User data not found');
          }
        } catch (error) {
          console.error("Token invalid or expired", error);
          await AsyncStorage.removeItem('userToken');
          await AsyncStorage.removeItem('userId');
          setUser(null);
        }
      } else {
        setUser(null);
      }
      setIsLoading(false);
    };

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userData = await getUserViaAsyncStorage(user.uid)
        if (userData) {
          setUser(userData);
          setIsLoading(false)
        }
      } else {
        checkSession();
      }
    });
    return () => unsubscribe();
  }, []);

  if (isLoading) {
    return <Text>Yükleniyor...</Text>;
  }


  return (
    <Provider store={store}>
      <AuthProvider>
        <NavigationContainer>
          <SafeAreaProvider>
            <Stack.Navigator>
              {user ? (
                <>
                  <Stack.Screen name="Home" options={{ headerShown: false }}>
                    {(props) => (
                      <Layout {...props}>
                        <Home children={null} {...props} />
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
                </>
              ) : (
                <>
                  <Stack.Screen name="Login" options={{ headerShown: false }}>
                    {(props) => (
                      <Login children={undefined} {...props} />
                    )}
                  </Stack.Screen>
                  <Stack.Screen name="Register" options={{ headerShown: false }}>
                    {(props) => (
                      <Register children={undefined} {...props} />
                    )}
                  </Stack.Screen>
                </>
              )}
            </Stack.Navigator>
          </SafeAreaProvider>
        </NavigationContainer>
      </AuthProvider>
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
