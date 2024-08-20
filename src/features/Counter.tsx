import React from 'react'
import { useAppSelector, useAppDispatch } from '../utils/hooks'
import { setUserData } from '../features/userSlice'
import { Button, View,Text } from 'react-native'
import { UserState } from '../types/interfaces'
import { RootState } from '../store/index';

export function Counter() {
    const stateObj = useAppSelector((state:RootState) => state.user)
    const dispatch = useAppDispatch()
    const initialState: UserState = {
        userId: '1',
        userName: 'ismail semih şentürk',
        userEmail: 'senturkis98@hotmail.com',
        userPreferences: {knight:false,metin2:true},
      };
      const initialState2: UserState = {
        userId: '2',
        userName: 'Metehan Temel',
        userEmail: 'metehan@hotmail.com',
        userPreferences: {knight:true,metin2:false},
      };

    return (
        <View>
            <View>
                <Button
                    title='Increment value'
                    onPress={() => dispatch(setUserData(initialState))}
                      
                >
                </Button>
                <Text>{stateObj.userName}</Text>
                <Text>{stateObj.userPreferences.knight.toString()}</Text>
                <Text>{stateObj.userPreferences.metin2.toString()}</Text>
                <Button
                    title="Decrement value"
                    onPress={() => dispatch(setUserData(initialState2))}
                >
                </Button>
            </View>
        </View>
    )
}