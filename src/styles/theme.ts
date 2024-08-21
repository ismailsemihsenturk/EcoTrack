export type FontWeight = '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900' | 'normal' | 'bold';

// src/styles/theme.ts
export const theme = {
  colors: {
    primary: '#4CAF50', // Yeşil renk
    secondary: '#3E903E', // Koyu yeşil
    accent: '#FFEB3B', // Sarı renk
    background: '#F1F8E9', // Açık yeşil
    text: '#FFFFFF', // Koyu gri
    secondary_text:'#404642',
    border:'#3E903E'
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
    fontSize: {
      small: 14,
      medium: 16,
      large: 18,
      title: 24,
    },
    fontWeight: {
      regular: '400',
      medium: '500',
      bold: '700',
    },
  },
  spacing: {
    xs: 8,
    sm: 12,
    md: 16,
    lg: 24,
    xl: 32,
  },
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 12,
  },
};

export type Theme = typeof theme;