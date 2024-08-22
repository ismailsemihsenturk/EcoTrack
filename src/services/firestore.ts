import { collection, getDocs, addDoc, doc, setDoc } from 'firebase/firestore';
import { db } from '../../firebase.config';
import { Tip, Article, Achievement, DailyFootprint } from '../types/interfaces';

export const getTips = async (): Promise<Tip[]> => {
  const snapshot = await getDocs(collection(db, 'tips'));
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Tip));
};

export const getArticles = async (): Promise<Article[]> => {
  const snapshot = await getDocs(collection(db, 'articles'));
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Article));
};

export const getAchievements = async (): Promise<Achievement[]> => {
  const snapshot = await getDocs(collection(db, 'achievements'));
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Achievement));
};

export const saveDailyFootprint = async (userId: string, footprint: DailyFootprint): Promise<void> => {
  await addDoc(collection(db, 'users', userId, 'footprints'), footprint);
};

export const getUserFootprints = async (userId: string): Promise<DailyFootprint[]> => {
  const snapshot = await getDocs(collection(db, 'users', userId, 'footprints'));
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as DailyFootprint));
};