// src/utils/seedDatabase.ts
import { collection, addDoc, setDoc, doc } from 'firebase/firestore';
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

const sampleAchievements = [
    {
        id: 'first_step',
        title: 'İlk Adım',
        description: 'İlk karbon ayak izi hesaplamanızı yaptınız!',
        imageUrl: 'https://example.com/first_step.png',
        requiredFootprint: 0
    },
    {
        id: 'carbon_saver_1',
        title: 'Karbon Tasarrufçusu I',
        description: 'Toplam 100 kg CO2 tasarrufu yaptınız!',
        imageUrl: 'https://example.com/carbon_saver_1.png',
        requiredFootprint: 100
    },
    {
        id: 'eco_warrior',
        title: 'Eko Savaşçı',
        description: 'Toplam 1000 kg CO2 tasarrufu yaptınız!',
        imageUrl: 'https://example.com/eco_warrior.png',
        requiredFootprint: 1000
    },
    {
        id: 'climate_champion',
        title: 'İklim Şampiyonu',
        description: 'Toplam 5000 kg CO2 tasarrufu yaptınız!',
        imageUrl: 'https://example.com/climate_champion.png',
        requiredFootprint: 5000
    }
];
const addSampleAchievements = async () => {
    const achievementsCollection = collection(db, 'achievements');
    for (const achievement of sampleAchievements) {
        await setDoc(doc(achievementsCollection, achievement.id), achievement);
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
    await addSampleAchievements()
};