import React, { useState } from 'react';
import { View, TextInput, Pressable, StyleSheet, Text } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase.config';
import { RootStackParamList, UserState } from '../types/interfaces';
import { StackNavigationProp } from '@react-navigation/stack';
import { setUserData } from '../features/userSlice';
import { useAppDispatch } from '../utils/hooks';
import { getUser } from '../services/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface LoginScreenProps {
    children: React.ReactNode;
    navigation: StackNavigationProp<RootStackParamList, 'Login'> | null;
}

const Login: React.FC<LoginScreenProps> = ({ navigation, children }) => {
    const dispatch = useAppDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
          const userCredential = await signInWithEmailAndPassword(auth, email, password);
          const { user } = userCredential;
          const token = await user.getIdToken();
          await AsyncStorage.setItem('userToken', token);
          await AsyncStorage.setItem('userId', user.uid);
          
          const reduxUser = await getUser(user.uid);
          if (reduxUser) {
            dispatch(setUserData(reduxUser));
            navigation?.navigate('Home', {});
          }
        } catch (error) {
          console.error('Login error:', error);
        }
      };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <Pressable
                style={styles.button}
                onPress={handleLogin}>
                <Text style={styles.text}>Login</Text>
            </Pressable>
            <Pressable
                style={styles.button}
                onPress={() => navigation?.navigate('Register', {})}>
                <Text style={styles.text}>Register</Text>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },
    input: {
        marginBottom: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: 'black',
        marginBottom: 5,
        marginTop: 5,
    },
    text: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
    },
});

export default Login;