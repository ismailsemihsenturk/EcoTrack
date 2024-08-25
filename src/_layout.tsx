import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { ThemeProvider } from 'styled-components/native';
import { FontWeight, theme } from '../src/styles/theme';
import { useAppSelector, useAppDispatch } from './utils/hooks'
import { RootState } from './store/index';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Button from './components/common/layoutButtons';
import { RootStackParamList, ScreenName, ScreenNames } from './types/interfaces';
import { StackNavigationProp } from '@react-navigation/stack';
import { useIsFocused } from '@react-navigation/native';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase.config';
import AsyncStorage from '@react-native-async-storage/async-storage';


interface LayoutProps {
    children: React.ReactNode;
    navigation: StackNavigationProp<RootStackParamList, 'Layout'>;
}

const Layout: React.FC<LayoutProps> = ({ children, navigation }) => {
    const { top: safeAreaTop } = useSafeAreaInsets();
    const { userName } = useAppSelector((state: RootState) => state.user)
    const [activeButton, setActiveButton] = useState<ScreenName | null>("Home");
    const isFocused = useIsFocused();

    const handleButtonPress = (pageName: ScreenName) => {
        setActiveButton(pageName);
        handleNavigation(pageName)
    };

    const handleNavigation = (page: ScreenName) => {
        if (page && page in ScreenNames) {
            navigation.navigate(page, {});
        } else {
            console.error("Invalid page name");
        }
    };

    useEffect(() => {
        if (isFocused) {
            const currentRouteName = navigation.getState().routes[navigation.getState().index].name as ScreenName;
            setActiveButton(currentRouteName);
        }
    }, [isFocused, navigation]);


    const handleLogout = async () => {
        try {
            await AsyncStorage.removeItem('userId')
            await AsyncStorage.removeItem('userToken')
            await signOut(auth);
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <View style={[styles.container, { paddingTop: safeAreaTop }]}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>Welcome, {userName}</Text>
                    <Pressable style={styles.headerLogout} onPress={handleLogout}><Text >Logout</Text></Pressable>
                </View>
                <View style={styles.content}>{children}</View>
                <View style={styles.footer}>
                    <Button children="Home" onPress={handleButtonPress} isActive={activeButton?.toString()} style={styles.lastButton} />
                    <Button children="Calculator" onPress={handleButtonPress} isActive={activeButton?.toString()} style={styles.lastButton} />
                    <Button children="Badgets" onPress={handleButtonPress} isActive={activeButton?.toString()} style={styles.lastButton} />
                    <Button children="Profile" onPress={handleButtonPress} isActive={activeButton?.toString()} />
                </View>
            </View>
        </ThemeProvider>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    header: {
        paddingVertical: theme.spacing.sm,
        paddingHorizontal: theme.spacing.md,
        backgroundColor: theme.colors.primary,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',

    },
    headerText: {
        color: theme.colors.text,
        fontSize: theme.typography.fontSize.medium,
        fontWeight: theme.typography.fontWeight.medium as FontWeight,
    },
    headerLogout: {
        color: theme.colors.logout,
        fontSize: theme.typography.fontSize.medium,
        fontWeight: theme.typography.fontWeight.medium as FontWeight,
        alignSelf: 'flex-end'
    },
    content: {
        flex: 1,
    },
    footer: {
        flexDirection: 'row',
    },
    lastButton: {
        borderRightWidth: theme.spacing.xs,
    },
});

export default Layout;