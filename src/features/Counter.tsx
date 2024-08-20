import React from 'react'
import { useAppSelector, useAppDispatch } from '../utils/hooks'
import { decrement, increment } from '../features/userSlice'
import { Button, View,Text } from 'react-native'
export function Counter() {
    const stateObj = useAppSelector((state) => state.counter)
    const dispatch = useAppDispatch()

    return (
        <View>
            <View>
                <Button
                    title='Increment value'
                    onPress={() => dispatch(increment())}
                >
                </Button>
                <Text>{stateObj.name}</Text>
                <Text>{stateObj.value}</Text>
                <Button
                    title="Decrement value"
                    onPress={() => dispatch(decrement())}
                >
                </Button>
            </View>
        </View>
    )
}