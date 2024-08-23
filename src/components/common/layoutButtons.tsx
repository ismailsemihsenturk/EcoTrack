import { StyleSheet, Text, View, TouchableOpacity, ViewStyle } from 'react-native'
import React, { Children, useState } from 'react'
import { FontWeight, theme } from '../../styles/theme';

interface ButtonProps {
    children: React.ReactNode;
    onPress: (value: Partial<React.ReactNode>) => void;
    isActive?: string;
    style?: ViewStyle;
  }
  
  const Button: React.FC<ButtonProps> = ({ children, onPress, isActive, style }) => {
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
          style,
        ]}
        onPress={handlePress}
        activeOpacity={0.7}
      >
        <Text style={[styles.footerButtonText,
            {color:
                isActive === children?.toString()
                ? theme.colors.text
                : theme.colors.secondary_text,
            },
            ]}>{children}</Text>
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
      borderRightColor: theme.colors.border,
    },
    footerButtonText: {
      color: theme.colors.text,
      fontSize: theme.typography.fontSize.medium,
      fontWeight: theme.typography.fontWeight.medium as FontWeight,
    },
    lastButton: {
        borderRightWidth: 0, 
      },
  });