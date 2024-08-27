import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { LeaderboardEntry, RootStackParamList } from '../types/interfaces';
import { useAppSelector, useAppDispatch } from '../utils/hooks';
import { fetchLeaderboardData } from '../features/leaderboardSlice';
import { fetchUserFootprintHistory } from '../features/carbonSlice';
//import { LineChart } from 'react-native-chart-kit';
import { LineChart, Grid } from 'react-native-svg-charts'
import UserInfo from '../components/screens/userInfo';
import { updateScoreandRank } from '../features/userSlice';

interface ProfileScreenProps {
  route: RouteProp<RootStackParamList, 'Profile'>;
}

const Profile: React.FC<ProfileScreenProps> = ({ route }) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  const leaderboard = useAppSelector((state) => state.leaderboard.entries);
  const footprintHistory = useAppSelector((state) => state.carbon.dailyFootprints);
  const [chartTimeframe, setChartTimeframe] = useState<'daily' | 'weekly' | 'monthly'>('daily');
  const [sortedLeaderboard, setSortedLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [LineChartData, setLineChartData] = useState<number[]>([]);

  useEffect(() => {
    // Create a new array by copying the leaderboard
    const sortedBoard = [...leaderboard].sort((a, b) => b.totalFootprint - a.totalFootprint);
    setSortedLeaderboard(sortedBoard);
  }, [leaderboard]);


  useEffect(() => {
    const newLineChartData = [
      0
    ].concat(
      Object.values(footprintHistory).map((fp) => {
        const dailyTotalFootprint = Number(fp.dailyTotalFootprint);
        return isNaN(dailyTotalFootprint) ? 0 : dailyTotalFootprint;
      })
    );

    setLineChartData(newLineChartData);
    console.log(LineChartData);
  }, [footprintHistory]);


  useEffect(() => {
    dispatch(fetchLeaderboardData());
    dispatch(updateScoreandRank({ userId: user.id, userName: user.userName }));
    const endDate = new Date();
    let startDate = new Date();
    if (chartTimeframe === 'daily') {
      startDate.setDate(endDate.getDate() - 7); // Last 7 days
    } else if (chartTimeframe === 'weekly') {
      startDate.setDate(endDate.getDate() - 28); // Last 4 weeks
    } else {
      startDate.setMonth(endDate.getMonth() - 6); // Last 6 months
    }
    dispatch(fetchUserFootprintHistory({ userId: user.id, startDate: startDate, endDate: endDate }));
  }, [dispatch, user.id, chartTimeframe]);


  const handleTimeframeChange = (timeframe: 'daily' | 'weekly' | 'monthly') => {
    setChartTimeframe(timeframe);
  };

  const renderLeaderboardItem = ({ item, index }: { item: LeaderboardEntry; index: number }) => (
    <View key={item.userId} style={styles.leaderboardItem}>
      <Text style={styles.rank}>{index + 1}</Text>
      <Text style={styles.username}>{item.userName}</Text>
      <Text style={styles.footprint}>{item.totalFootprint.toFixed(2)}</Text>
    </View>
  );

  // const chartData = {
  //   labels: Object.values(footprintHistory).map(fp => new Date(fp.date).toLocaleDateString()),
  //   datasets: [
  //     {
  //       data: Object.values(footprintHistory).map(fp => Number(fp.dailyTotalFootprint) || 0),
  //       color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
  //     }
  //   ]
  // };


  if (LineChartData.length === 0) {
    return <Text>No data available for the selected timeframe.</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      <UserInfo user={user} />

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Global Leaderboard</Text>
        {sortedLeaderboard.map((item, index) => (
          renderLeaderboardItem({ item, index })
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Carbon Footprint History</Text>
        <View style={styles.timeframeButtons}>
          <TouchableOpacity
            style={[styles.button, chartTimeframe === 'daily' && styles.activeButton]}
            onPress={() => handleTimeframeChange('daily')}
          >
            <Text>Daily</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, chartTimeframe === 'weekly' && styles.activeButton]}
            onPress={() => handleTimeframeChange('weekly')}
          >
            <Text>Weekly</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, chartTimeframe === 'monthly' && styles.activeButton]}
            onPress={() => handleTimeframeChange('monthly')}
          >
            <Text>Monthly</Text>
          </TouchableOpacity>
        </View>
        {/* <LineChart
          data={chartData}
          width={Dimensions.get('window').width - 16}
          height={220}
          chartConfig={{
            backgroundColor: '#e26a00',
            backgroundGradientFrom: '#fb8c00',
            backgroundGradientTo: '#ffa726',
            decimalPlaces: 2,
            formatYLabel: (value) => Number(value).toFixed(2),
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16
            }
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16
          }}
        /> */}
        <View>
          <LineChart
            style={styles.lineChart}
            data={LineChartData}
            svg={{ stroke: 'rgb(134, 65, 244)' }}
            contentInset={{ top: 20, bottom: 20 }}
          ><Grid />
          </LineChart>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  timeframeButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 12,
  },
  button: {
    padding: 8,
    borderRadius: 4,
    backgroundColor: '#e0e0e0',
  },
  activeButton: {
    backgroundColor: '#4CAF50',
  },
  leaderboardItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  rank: {
    fontWeight: 'bold',
    width: 30,
  },
  username: {
    flex: 1,
  },
  footprint: {
    width: 80,
    textAlign: 'right',
  },
  lineChart: {
    height: 200
  }
});

export default Profile;