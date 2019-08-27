import React from 'react';
import { View, Text,ScrollView, Dimensions,StyleSheet, Button,Image } from 'react-native';
import BodyText from '../components/BodyText';
import Colors  from '../constants/colors';
import MainButton from '../components/MainButton';

const GameOverScreen = (props) => {
    return (
        <ScrollView>
        <View style={styles.screen}>
            <BodyText>Game is Over</BodyText>
            
            <Image
                style={styles.image}
                resizeMode="contain"
                source={require('../assets/success.png')}
            />
            <View style={styles.resultContainer}>
            <BodyText>
                Your phone needed: <Text style={styles.highLight}>{props.roundsNumber}</Text> 
                to figure out your Number: <Text style={styles.highLight}>{props.userNumber}</Text>
            </BodyText>
            </View>
            
            <MainButton
                onPress={props.onRestartGame}
            >New Game</MainButton>
        </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    highLight: {
        color: Colors.primary
    },
    image: {
        width: '80%',
        height: 300
    },
    resultContainer: {
        marginHorizontal: 20
    }
})
export default GameOverScreen;