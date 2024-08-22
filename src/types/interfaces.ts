export interface UserPreferences {
    // Add user preference fields as needed
    theme: 'light' | 'dark';
    notificationsEnabled: boolean;
  }
  
  export interface UserState {
    userId: string;
    userName: string;
    userEmail: string;
    userPreferences: UserPreferences;
    profilePicture: string;
    totalScore: number;
    ranking: number;
  }
  
 // Existing interfaces (User, UserPreferences, etc.) remain the same

export interface Tip {
    id: string;
    title: string;
    content: string;
    category: string;
  }
  
  export interface TipsState {
    tips: Tip[];
    categories: string[];
    loading: boolean;
    error: string | null;
  }
  
  export interface Article {
    id: string;
    title: string;
    content: string;
    author: string;
    publishDate: string;
  }
  
  export interface ArticlesState {
    articles: Article[];
    loading: boolean;
    error: string | null;
  }
  
  export interface Achievement {
    id: string;
    name: string;
    description: string;
    imageUrl: string;
    requiredScore: number;
  }
  
  export interface AchievementsState {
    achievements: Achievement[];
    unlockedAchievements: Achievement[];
    loading: boolean;
    error: string | null;
  }
  
  export interface DailyFootprint {
    date: string;
    footprint: number;
  }
  
  export interface CarbonState {
    dailyFootprints: { [date: string]: number };
    monthlyAverage: number;
    totalReduction: number;
    loading: boolean;
    error: string | null;
  }
  
  export interface RootState {
    user: UserState;
    tips: TipsState;
    articles: ArticlesState;
    achievements: AchievementsState;
    carbon: CarbonState;
  }
export type RootStackParamList = {
    Home: { id?: string };
    Profile: { id?: string };
    Layout: { id?: string };
    Calculator: { id?: string };
    Badgets: { id?: string };
};
export const ScreenNames = {
    Home: 'Home',
    Profile: 'Profile',
    Calculator: 'Calculator',
    Badgets: 'Badgets',
} as const;
export type ScreenName = keyof typeof ScreenNames;