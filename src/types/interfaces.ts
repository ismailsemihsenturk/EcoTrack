export interface UserPreferences {
  theme: 'light' | 'dark' | 'system';
  notificationsEnabled: boolean;
  language: 'en' | 'tr' | 'es';
}

export interface UserState {
  userId: string;
  userName: string;
  userEmail: string;
  userPreferences: UserPreferences;
  profilePicture?: string;
  totalScore: number;
  ranking: number;
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
  name: string;
  description: string;
  imageUrl: string;
  requiredScore: number;
}

export interface UnlockedAchievement extends Achievement {
  unlockedDate: string;
}

export interface AchievementsState {
  achievements: Achievement[];
  unlockedAchievements: UnlockedAchievement[];
  loading: boolean;
  error: string | null;
}


export interface DailyFootprint {
  id: string,
  date: string;
  footprint: number;
}

export interface CarbonState {
  dailyFootprints: { [date: string]: DailyFootprint };
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
  Layout: { id?: string }
};

export const ScreenNames = {
  Home: 'Home',
  Calculator: 'Calculator',
  Badgets: 'Badgets',
  Profile: 'Profile',
} as const;
export type ScreenName = keyof typeof ScreenNames;