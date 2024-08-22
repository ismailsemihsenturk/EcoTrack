// src/utils/seedDatabase.ts
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../firebase.config';

const seedTips = async () => {
    const tipsCollection = collection(db, 'tips');
    const tipsData = [
        { title: 'Tip 1', content: 'Content 1', category: 'sustainability' },
        { title: 'Tip 2', content: 'Content 2', category: 'energy' },
        { title: 'Tip 4', content: 'Content 3', category: 'waste' },
    ];

    for (let tip of tipsData) {
        await addDoc(tipsCollection, tip);
    }
};

const seedUsers = async () => {
    const usersCollection = collection(db, 'users');
    const usersData = [
        {
            userName: 'İsmail Semih Şentürk',
            userEmail: 'senturkis98@hotmail.com',
            userPreferences: {
                theme: 'dark',
                notificationsEnabled: false,
                language: "tr"
            },
            profilePicture: '',
            totalScore: 0,
            ranking: 0,
        },
        {
            userName: 'Mete Han Temel',
            userEmail: 'mete@hotmail.com',
            userPreferences: {
                theme: 'dark',
                notificationsEnabled: false,
                language: "tr"
            },
            profilePicture: '',
            totalScore: 0,
            ranking: 0,
        },
    ];

    for (let user of usersData) {
        await addDoc(usersCollection, user);
    }
};

const seedArticles = async () => {
    const articlesCollection = collection(db, 'articles');
    const articlesData = [
        {
            title: "title 1",
            content: "article content 1",
            author: "İsmail Semih Şentürk",
            publishDate: new Date().toLocaleString(),
        },
        {
            title: "title 2",
            content: "article content 2",
            author: "Mete Han Temel",
            publishDate: new Date().toLocaleString(),
        },
        {
            title: "title 3",
            content: "article content 3",
            author: "Beril Şentürk",
            publishDate: new Date().toLocaleString(),
        },
    ];

    for (let article of articlesData) {
        await addDoc(articlesCollection, article);
    }
}

const seedAchievements = async () => {
    const achievementCollection = collection(db, 'achievement');
    const achievementsData = [
        {
            name: "achievement name 1",
            description: "achievement desc 1",
            imageUrl: "img url 1",
            requiredScore: 10,
        },
        {
            name: "achievement name 2",
            description: "achievement desc 2",
            imageUrl: "img url 2",
            requiredScore: 20,
        },
        {
            name: "achievement name 3",
            description: "achievement desc 3",
            imageUrl: "img url 3",
            requiredScore: 30,
        },
    ];

    for (let achievement of achievementsData) {
        await addDoc(achievementCollection, achievement);
    }
};

const seedDailyFootPrints = async () => {
    const dailyFootPrintsCollection = collection(db, 'dailyFootPrints');
    const dailyFootPrintsData = [
        {
            date: new Date().toLocaleString(),
            footprint: 10,
        },
        {
            date: new Date().toLocaleString(),
            footprint: 50,
        },
        {
            date: new Date().toLocaleString(),
            footprint: 100,
        },
    ];

    for (let dailyFootPrint of dailyFootPrintsData) {
        await addDoc(dailyFootPrintsCollection, dailyFootPrint);
    }
}


export const seedDatabase = async () => {
    await seedTips();
    await seedUsers();
    await seedArticles();
    await seedAchievements();
    await seedDailyFootPrints();
};