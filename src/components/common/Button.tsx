import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { Children, useState } from 'react'
import { FontWeight, theme } from '../../styles/theme';

interface ButtonProps {
    children: React.ReactNode;
    onPress: (value: Partial<React.ReactNode>) => void;
    isActive?: string;
  }
  
  const Button: React.FC<ButtonProps> = ({ children, onPress, isActive }) => {
    const handlePress = () => {
      onPress(children);
    };
  
    return (
      <TouchableOpacity
        style={[
          styles.footerButton,
          {
            backgroundColor:
              isActive === children?.toString()
                ? theme.colors.secondary
                : theme.colors.primary,
          },
        ]}
        onPress={handlePress}
      >
        <Text style={styles.footerButtonText}>{children}</Text>
      </TouchableOpacity>
    );
  };
export default Button

const styles = StyleSheet.create({
    footerButton: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: theme.spacing.sm,
    },
    footerButtonText: {
      color: theme.colors.text,
      fontSize: theme.typography.fontSize.medium,
      fontWeight: theme.typography.fontWeight.medium as FontWeight,
    },
  });