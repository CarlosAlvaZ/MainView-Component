import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React from 'react'
import cancel from '../assets/cancel.png'
import chat from '../assets/chat.png'
import like from '../assets/like.png'

export default function MainViewButtons() {
  return (
    <View style={styles.mainView}>
        <TouchableOpacity style={styles.button}>
            <Image style={styles.cancel} source={cancel}/>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
            <Image style={styles.chat} source={chat}/>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
            <Image style={styles.like} source={like}/>
        </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
    mainView : {
        width : '100%',
        height : '100%',
        display : 'flex',
        flexDirection : 'row',
        alignItems : 'center',
        justifyContent : 'center'
    },
    button : {
        padding : 0,
        margin : 15,
        width : 60,
        height : 60,
        display : 'flex',
        flexDirection : 'column',
        alignItems : 'center',
        justifyContent : 'center',
        borderRadius : 50,
        backgroundColor : '#D9D9D9'
    },
})