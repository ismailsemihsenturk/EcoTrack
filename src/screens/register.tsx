import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Pressable, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase.config';
import { RootStackParamList, UserState } from '../types/interfaces';
import { StackNavigationProp } from '@react-navigation/stack';
import { useAppDispatch } from '../utils/hooks';
import { setUserData } from '../features/userSlice';
import { addUser } from '../services/firestore';

interface RegisterScreenProps {
    children: React.ReactNode;
    navigation: StackNavigationProp<RootStackParamList, 'Register'>;
}

const Register: React.FC<RegisterScreenProps> = ({ navigation, children }) => {
    const dispatch = useAppDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userName, setUserName] = useState('');

    const handleRegister = async () => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const { user } = userCredential;
            const userState: UserState = {
                id: user.uid,
                userName: userName || 'Anonymous',
                userEmail: user.email || '',
                userPreferences: {
                    theme: 'light',
                    notificationsEnabled: false,
                    language: "tr"
                },
                profilePicture: user.photoURL || '',
                totalScore: 0,
                ranking: 0,
            };
            addUser(userState)
            dispatch((setUserData(userState)));
            navigation.navigate('Home', {});
        } catch (error) {
            console.error('Register error:', error);
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Username"
                value={userName}
                onChangeText={setUserName}
            />
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
                onPress={handleRegister}>
                <Text style={styles.text}>Register</Text>
            </Pressable>
        </View >
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

export default Register;