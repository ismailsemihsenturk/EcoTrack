import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ThemeProvider } from 'styled-components/native';
import { FontWeight, theme } from '../src/styles/theme';
import { useAppSelector, useAppDispatch } from './utils/hooks'
import { RootState } from './store/index';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Button from './components/common/Button';
import { RootStackParamList, ScreenName, ScreenNames } from './types/interfaces';
import { StackNavigationProp } from '@react-navigation/stack';
import { useIsFocused } from '@react-navigation/native';

interface LayoutProps {
    children: React.ReactNode;
    navigation: StackNavigationProp<RootStackParamList, 'Layout'>;
}

const Layout: React.FC<LayoutProps> = ({ children, navigation }) => {
    const { top: safeAreaTop } = useSafeAreaInsets();
    const { userName } = useAppSelector((state: RootState) => state.user)
    const [activeButton, setActiveButton] = useState<ScreenName | null>("Home");
    const isFocused = useIsFocused();


    const handleButtonPress = (button: Partial<React.ReactNode>) => {
        let pageName = button as ScreenName
        setActiveButton(pageName);
        handleNavigation(pageName)
    };

    const handleNavigation = (button: ScreenName) => {
        if (button && button in ScreenNames) {
            navigation.navigate(ScreenNames[button], {});
        } else {
            console.error("Invalid page name");
        }
    };
    
    useEffect(() => {
        if (isFocused) {
            setActiveButton(navigation.getState().routeNames[navigation.getState().index] as ScreenName);
        }
    }, [isFocused]);

    return (
        <ThemeProvider theme={theme}>
            <View style={[styles.container, { paddingTop: safeAreaTop }]}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>Welcome, {userName}</Text>
                </View>
                <View style={styles.content}>{children}</View>
                <View style={styles.footer}>
                    <Button children={"Home"} onPress={handleButtonPress} isActive={activeButton?.toString()} style={styles.lastButton} />
                    <Button children={"Calculator"} onPress={handleButtonPress} isActive={activeButton?.toString()} style={styles.lastButton} />
                    <Button children={"Badgets"} onPress={handleButtonPress} isActive={activeButton?.toString()} style={styles.lastButton} />
                    <Button children={"Profile"} onPress={handleButtonPress} isActive={activeButton?.toString()} />
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
        justifyContent: 'flex-end',
    },
    headerText: {
        color: theme.colors.text,
        fontSize: theme.typography.fontSize.medium,
        fontWeight: theme.typography.fontWeight.medium as FontWeight,
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