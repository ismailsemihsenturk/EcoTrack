import { collection, getDocs, addDoc, doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase.config';
import { Tip, Article, Achievement, DailyFootprint, UserState, CustomUser } from '../types/interfaces';
import { IdTokenResult, User } from '@firebase/auth';

export const getTips = async (): Promise<Tip[]> => {
  try {
    const snapshot = await getDocs(collection(db, 'tips'));
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Tip));
  } catch (error) {
    console.log("error: " + error);
    return [];
  }
};

export const getArticles = async (): Promise<Article[]> => {
  try {
    const snapshot = await getDocs(collection(db, 'articles'));
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Article));
  } catch (error) {
    console.log("error: " + error);
    return  [];
  }
};

export const getAchievements = async (): Promise<Achievement[]> => {
  try {
    const snapshot = await getDocs(collection(db, 'achievements'));
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Achievement));
  } catch (error) {
    console.log("error: " + error);
    return [];
  }
};

export const saveDailyFootprint = async (userId: string, footprint: DailyFootprint): Promise<void> => {
  try {
    const footprintToSave = {
      ...footprint,
      id: userId, 
      date: Date.now(),
    };
    const userRef = doc(db, 'users', userId);
    const footprintsRef = collection(userRef, 'footprints'); 
    await addDoc(footprintsRef, footprintToSave);
  } catch (error) {
    console.log("error: " + error);
  }
};


export const getUserFootprints = async (userId: string): Promise<DailyFootprint[]> => {
  try {
    const snapshot = await getDocs(collection(db, 'users', userId, 'footprints'));
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }) as DailyFootprint);
  } catch (error) {
    console.log("error: " + error);
    return [];
  }
};

export const addUser = async (user: UserState): Promise<void> => {
  try {
    const userState: UserState = {
      id: user.id,
      userName: user.userName || 'Anonymous',
      userEmail: user.userEmail || '',
      userPreferences: {
        theme: 'light',
        notificationsEnabled: false,
        language: "tr"
      },
      profilePicture: user.profilePicture || '',
      totalScore: 0,
      ranking: 0,
    };
    await setDoc(doc(db, 'users', user.id), userState);
  } catch (error) {
    console.log("error: " + error);
  }
}

export const getUser = async (userId: string): Promise<UserState | null> => {
  try {
    const userRef = doc(db, 'users', userId);
    const userDoc = await getDoc(userRef);

    if (!userDoc.exists()) {
      return null;
    }
    const userData = userDoc.data();
    const
      userState: UserState = {
        id: userData.id,
        userName: userData.userName || 'Anonymous',
        userEmail: userData.userEmail || '',
        userPreferences: userData.userPreferences,
        profilePicture: userData.profilePicture || '',
        totalScore: userData.totalScore,
        ranking: userData.ranking,
      };
    return userState;
  } catch (error) {
    console.log("error: " + error);
    return null;
  }
};

export const getUserViaAsyncStorage = async (userId: string): Promise<CustomUser | null> => {
  try {
    const userRef = doc(db, 'users', userId);
    const userDoc = await getDoc(userRef);

    if (!userDoc.exists()) {
      return null;
    }

    const userStateData = userDoc.data();

    if (!userStateData) {
      return null;
    }

    const customUser: CustomUser = {
      uid: userStateData.id,
      email: userStateData.userEmail || null,
      displayName: userStateData.userName || null,
    };

    return customUser;
  } catch (error) {
    console.error("getUserViaAsyncStorage error:", error);
    return null;
  }
};