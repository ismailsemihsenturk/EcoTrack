import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { UserState } from '../../types/interfaces';

interface UserInfoProps {
    user: UserState;
}

const UserInfo: React.FC<UserInfoProps> = ({ user }) => {
    return (
        <View style={styles.container}>
            <Image
                source={user.profilePicture ? { uri: user.profilePicture } : require('../../../assets/favicon.png')}
                style={styles.avatar}
            />
            <View style={styles.infoContainer}>
                <Text style={styles.username}>{user.userName}</Text>
                <Text style={styles.email}>{user.userEmail}</Text>
                <View style={styles.statsContainer}>
                    <View style={styles.statItem}>
                        <Text style={styles.statValue}>{user.totalScore}</Text>
                        <Text style={styles.statLabel}>Total Score</Text>
                    </View>
                    <View style={styles.statItem}>
                        <Text style={styles.statValue}>{user.ranking}</Text>
                        <Text style={styles.statLabel}>Ranking</Text>
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: 16,
        backgroundColor: '#f0f0f0',
        borderRadius: 8,
        marginBottom: 16,
    },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 40,
        marginRight: 16,
    },
    infoContainer: {
        flex: 1,
    },
    username: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    email: {
        fontSize: 14,
        color: '#666',
        marginBottom: 8,
    },
    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    statItem: {
        alignItems: 'center',
    },
    statValue: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    statLabel: {
        fontSize: 12,
        color: '#666',
    },
});

export default UserInfo;