import React, {useState} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ThemeProvider } from 'styled-components/native';
import { FontWeight, theme } from '../src/styles/theme';
import { useAppSelector, useAppDispatch } from './utils/hooks'
import { RootState } from './store/index';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Button from './components/common/Button';

interface LayoutProps {
    children: React.ReactNode;
}
const Layout: React.FC<LayoutProps> = ({ children }) => {
    const { top: safeAreaTop } = useSafeAreaInsets();
    const { userName } = useAppSelector((state: RootState) => state.user)
    const [activeButton, setActiveButton] = useState<Partial<React.ReactNode> | null>("Home");
    const handleButtonPress = (button: Partial<React.ReactNode>) => {
        setActiveButton(button);
      };

    return (
        <ThemeProvider theme={theme}>
            <View style={[styles.container, { paddingTop: safeAreaTop }]}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>Welcome, {userName}</Text>
                </View>
                <View style={styles.content}>{children}</View>
                <View style={styles.footer}>
                <Button children={"Home"}  onPress={handleButtonPress} isActive={activeButton?.toString()} style={styles.lastButton}/>
                <Button children={"Calculator"}  onPress={handleButtonPress} isActive={activeButton?.toString()} style={styles.lastButton}/>
                <Button children={"Badgets"}  onPress={handleButtonPress} isActive={activeButton?.toString()}  style={styles.lastButton}/>
                <Button children={"Profile"}  onPress={handleButtonPress} isActive={activeButton?.toString()}/>
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