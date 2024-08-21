export interface UserState {
    userId: string;
    userName: string;
    userEmail: string;
    userPreferences: {
        [key: string]: boolean;
    };
}

export interface Habit {
    id: string;
    name: string;
    progress: number;
    goal: number;
}

export interface HabitsState {
    habits: Habit[];
    habitProgress: { [habitId: string]: number };
    habitGoals: { [habitId: string]: number };
}

export interface Tip {
    id: string;
    title: string;
    content: string;
    category: string;
}

export interface TipsState {
    tips: Tip[];
    tipCategories: string[];
    tipsSavedByUser: string[];
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