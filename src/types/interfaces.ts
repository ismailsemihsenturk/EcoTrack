export interface UserPreferences {
  theme: 'light' | 'dark' | 'system';
  notificationsEnabled: boolean;
  language: 'en' | 'tr' | 'es';
}

export interface UserState {
  id: string;
  userName: string;
  userEmail: string;
  userPreferences: UserPreferences;
  profilePicture?: string;
  totalScore: number;
  ranking: number;
}

export interface CustomUser {
  uid: string;
  email: string | null;
  displayName: string | null;
}
export interface Tip {
  id: string;
  title: string;
  content: string;
  category: string;
}

export interface TipsState {
  tips: Tip[];
  categories: Array<'sustainability' | 'energy' | 'waste'>;
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
  title: string; 
  description: string;
  imageUrl: string;
  requiredFootprint: number;  
  category?: string;  
}

export interface UnlockedAchievement extends Achievement {
  unlockedDate: string;
}

export interface AchievementsState {
  achievements: Achievement[];
  unlockedAchievements: UnlockedAchievement[];
  totalFootPrint: TotalUserFootPrint | null;
  loading: boolean;
  error: string | null;
}

export interface TotalUserFootPrint {
  userId: string;
  totalFootprint: number;
  lastUpdated: string;
}

export interface DailyFootprint {
  id: string,
  date: string;
  transport: number;
  energy: number;
  food: number;
  dailyTotalFootprint: number;
}


export interface CarbonState {
  dailyFootprints: { [date: string]: DailyFootprint };
  weeklyAverage: number;
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
  Home: { userId?: string };
  Calculator: { id?: string };
  Badgets: { achievementId?: string };
  Profile: { userId?: string; profilePicture?: string };
  Layout: { id?: string };
  Login: { id?: string };
  Register: { id?: string };
};
import { StackNavigationProp } from '@react-navigation/stack';
export type NavigationProp = StackNavigationProp<RootStackParamList>;
export const ScreenNames = {
  Home: 'Home',
  Calculator: 'Calculator',
  Badgets: 'Badgets',
  Profile: 'Profile',
  Login: 'Login',
  Register: 'Register',
} as const;
export type ScreenName = keyof typeof ScreenNames;