import React from 'react';
import { StyleSheet, Text, View, Dimensions, SafeAreaView, Image, Animated, PanResponder, TouchableOpacity } from 'react-native'
import MainViewButtons from './MainViewButtons';
import provisionalData from "./provisionalData"

const { width, height } = Dimensions.get("window")
const usersData = provisionalData

export default class MainView extends React.Component {

    constructor(){
        super()

        this.position = new Animated.ValueXY()
        this.state = {
            currentIndex : 0
        }

        this.rotate = this.position.x.interpolate({
            inputRange : [-width/2, 0, width/2],
            outputRange : ['-10deg', '0deg', '10deg'],
            extrapolate : 'clamp'
        })

        this.rotateAndTranslate = {
            transform : [{
                rotate : this.rotate,
            },
        ...this.position.getTranslateTransform()]
        }

        this.nextCardOpacity = this.position.x.interpolate({
            inputRange : [-width/2, 0, width/2],
            outputRange : [1, 0, 1],
            extrapolate : 'clamp'
        })

        this.nextCardScale = this.position.x.interpolate({
            inputRange : [-width/2, 0, width/2],
            outputRange : [1, 0.9, 1],
            extrapolate : 'clamp'
        })
    }

    componentWillMount(){
        this.PanResponder = PanResponder.create({
            onStartShouldSetPanResponder : (e,gestureState) => true,
            onPanResponderMove : (e,gestureState) => {
                this.position.setValue({ x : gestureState.dx, y : gestureState.dy })
            },
            onPanResponderEnd : (e,gestureState) => {
                if (gestureState.dx > 120) {
                    Animated.spring( this.position, {
                        toValue : {x : width+100, y : gestureState.dy},
                        useNativeDriver : true
                    } ).start(()=>{
                        this.setState( { currentIndex : this.currentIndex++ }, ()=>{
                            this.position.setValue( { x : 0, y : 0 } )
                        } )
                    })
                } else if (gestureState.dx < -120) {
                    Animated.spring( this.position, {
                        toValue : {x : -width-100, y : gestureState.dy},
                        useNativeDriver : true
                    } ).start(()=>{
                        this.setState( { currentIndex : this.currentIndex++ }, ()=>{
                            this.position.setValue( { x : 0, y : 0 } )
                        } )
                    })
                } else {
                    Animated.spring(this.position, {
                        toValue :   { x : 0, y : 0 },
                        friction : 4,
                        useNativeDriver : true
                    }).start()
                }
            }
        })
    }

    renderUsers = () => {

        return usersData.map( (user, id) => {

            if ( id < this.state.currentIndex ) {
                return null
            } 
            else if ( id == this.state.currentIndex ) {
    
                return (
                    <Animated.View key={id} style={ [ this.rotateAndTranslate, styles.animatedView ] } {...this.PanResponder.panHandlers}>
                        <View style={styles.mainAnimatedComponent}>
                            <Image style={styles.userPhoto} source={user.photo}/>
                            <View style={styles.userData}>
                                <Text style={styles.userName}>{user.userName}</Text>
                                <Text style={styles.userSubtitle}>{user.userSubtitle}</Text>
                                <TouchableOpacity syle={styles.description}>
                                    <Text style={styles.photoDescription}>{user.photoDescription}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Animated.View>
                )

            } else {
                return (
                    <Animated.View key={id} style={ [ {opacity : this.nextCardOpacity, transform : [{scale:this.nextCardScale}]}, styles.animatedView ] }>
                        <Image style={styles.userPhoto} source={user.photo}/>
                    </Animated.View>
                )
            }

        } ).reverse()
    }
    
    render() {
       return (
           <View style={styles.contentView}>
                <View style={styles.contentView}>
                    {this.renderUsers()}
                </View>
                <View style={styles.mainViewButtons}>
                    <MainViewButtons/>
                </View>
           </View>
       )
    }

}

const styles = StyleSheet.create({
  contentView : {
    flex : 1,
    backgroundColor : '#000000'
  },
  animatedView : {
    width : width,
    height : height,
    position : 'absolute',
  },
  mainAnimatedComponent : {
    width : width,
    height : height,
    position : 'relative'
  },
  userPhoto : {
    position : 'absolute',
    height : height,
    width : width
  },
  userData : {
    paddingHorizontal : 20,
    display : 'flex',
    flexDirection : 'column',
    alignItems : 'baseline',
    position : 'absolute',
    width : width,
    height : height / 3,
    bottom : height / 6,
    backgroundColor : 'transparent',
    zIndex : 100,
  },
  userName : {
    color : 'white',
    fontSize : 32,
    fontWeight : 'bold',
    marginVertical : 5
  },
  userSubtitle : {
    color : 'white',
    fontSize : 20,
    fontWeight : 100,
    marginVertical : 5
  },
  description : {
    height : height / 6,
    overflowY : 'hidden',
    borderColor : 'black',
    borderWidth : 10
  },
  photoDescription : {
    color : 'white',
    fontSize : 16,
    lineHeight : 20,
    marginVertical : 5
  },
  mainViewButtons : {
    width : width,
    height : height / 5
  }
});
