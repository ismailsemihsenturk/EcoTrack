import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ThemeProvider } from 'styled-components/native';
import { FontWeight, theme } from '../src/styles/theme';
import { useAppSelector, useAppDispatch } from './utils/hooks'
import { RootState } from './store/index';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface LayoutProps {
    children: React.ReactNode;
}
const Layout: React.FC<LayoutProps> = ({ children }) => {
    const { top: safeAreaTop } = useSafeAreaInsets();
    const { userName } = useAppSelector((state: RootState) => state.user)
    return (
        <ThemeProvider theme={theme}>
            <View style={[styles.container, { paddingTop: safeAreaTop }]}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>Hoş geldiniz, {userName}</Text>
                </View>
                <View style={styles.content}>{children}</View>
                <View style={styles.footer}>
                    <View style={styles.footerButton}>
                        <Text style={styles.footerButtonText}>Buton 1</Text>
                    </View>
                    <View style={styles.footerButton}>
                        <Text style={styles.footerButtonText}>Buton 2</Text>
                    </View>
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
        backgroundColor: theme.colors.primary,
        paddingVertical: theme.spacing.sm,
    },
    footerButton: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    footerButtonText: {
        color: theme.colors.text,
        fontSize: theme.typography.fontSize.medium,

    },
});

export default Layout;