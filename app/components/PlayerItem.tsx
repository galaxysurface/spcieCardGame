import { Dimensions, Pressable, StyleSheet, Text, View, useWindowDimensions } from 'react-native'
import React from 'react'
import { PlayerType } from '../../types/PlayerType'

import { Entypo } from '@expo/vector-icons';

import { Gesture, GestureDetector, GestureHandlerRootView , PanGestureHandler } from 'react-native-gesture-handler';
import Animated ,{ runOnJS, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

import { Ionicons } from '@expo/vector-icons';
import { initializeDatabase } from '../../database/db';


type Props = {
    item: PlayerType,
    onDelete: (id: number) => void
}


const LIST_ITEM_HEIGHT = 70

const { width: SCREEN_WIDHT } = Dimensions.get('window')
const TRANSLATE_X_THRESHOLD = -SCREEN_WIDHT * .2

const PlayerItem = ({item, onDelete}: Props) => {

    const {name} = item

    const translationX = useSharedValue(0)
    const itemHeight = useSharedValue(LIST_ITEM_HEIGHT)
    const opacity = useSharedValue(1)

    

    const pan = Gesture.Pan()
    .onUpdate((e) => {
        translationX.value = e.translationX
    })
    .onEnd((e) =>{
        const shouldBeDismissed = translationX.value < TRANSLATE_X_THRESHOLD
        if(shouldBeDismissed){
            translationX.value = withTiming(-SCREEN_WIDHT)
            opacity.value = 0
            itemHeight.value = withTiming(0, undefined,(finished)=>{
                if(finished){
                    translationX.value = withTiming(0),
                    runOnJS(initializeDatabase.getAllPlayers)()
                }
            } )
        }else {

            translationX.value = withTiming(0)
        }

    })


    const animatedStyle = useAnimatedStyle(() =>{
        return {
            transform: [
                {translateX: translationX.value}
            ]
        }
    })

    const rIconContainerStyle = useAnimatedStyle(() =>{
        const opacity = translationX.value > TRANSLATE_X_THRESHOLD ? 0 : 1
        return {
            opacity: withTiming(opacity)
        }
    })
    const rContainer = useAnimatedStyle(()=>({
        height: itemHeight.value,
        opacity: opacity.value
    })) 

    const handleDelete = () => {
        onDelete(item.id); // Call the onDelete callback function with the item id
      };


  return (
    <GestureHandlerRootView>
        <GestureDetector gesture={pan}>
            <Animated.View style={[{flexDirection: 'row'}, rContainer]}>
                <Animated.View style={[styles.iconCOntainer, rIconContainerStyle]}>
                <Ionicons name="trash" size={LIST_ITEM_HEIGHT * .8} color="black" />
                </Animated.View>
                <Animated.View style={[styles.item, animatedStyle]}>
                    <Entypo name="emoji-flirt" size={12} color="black" />
                    <Text style={styles.deleteText}>{name}</Text>
                </Animated.View>
            </Animated.View>
        </GestureDetector>
    </GestureHandlerRootView>
  )
}
const styles = StyleSheet.create({
    item: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        borderRadius: 10,
        alignItems: 'center',
        shadowColor: "#000",
        flexDirection: 'row',
        gap: 11,
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
      },
      deleteButton: {
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
        width: 100,
        height: '100%',
      },
      deleteText: {
        color: '#000',
      },
      iconCOntainer: {
        width: LIST_ITEM_HEIGHT,
        height: LIST_ITEM_HEIGHT,
        position: 'absolute',
        right: '2%',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
      }
})

export default PlayerItem
