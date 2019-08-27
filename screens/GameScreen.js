import React, {useState, useRef, useEffect} from 'react';
import { View, Text, StyleSheet,Dimensions,Button, FlatList, Alert ,ScrollView} from 'react-native';
import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';
import DefaultStyles from '../constants/default-styles';
import MainButton from '../components/MainButton';
import {Ionicons} from '@expo/vector-icons';
import BodyText from '../components/BodyText';
const generateRandomBetween = (min, max, exclude) => {
    min  = Math.ceil(min);
    max = Math.floor(max);
    const rndNum = Math.floor(Math.random() *(max-min)) + min;
    if(rndNum === exclude) {
        return generateRandomBetween(min, max, exclude);
    }else {
        return rndNum;
    }
}


const renderListItem = (listLength,itemData) =>(
    <View style={styles.listItem}>
        <BodyText>#{listLength - itemData.index}</BodyText>
        <BodyText>{itemData.item}</BodyText>
    </View>
);

const GameScreen = (props) => {
    const initialGuess = generateRandomBetween(1,100, props.userChoice);

    const [currentGuess, setCurrentGuess] = useState(initialGuess);
    

    const [pastGuesses, setPastGuesses] = useState([initialGuess.toString()]);    


    const [availableDeviceWidth, setavailableDeviceWidth] = useState(
        Dimensions.get('window').width
    ); 

    const [availableDeviceHeight, setavailableDeviceHeight] = useState(
        Dimensions.get('window').height
    );


    const currentLow = useRef(1);
    const currentHigh =useRef(100);
    
    const {userChoice, onGameOver} = props;

    
    useEffect(() => {
        const updateLayout = () => {
            setavailableDeviceWidth(Dimensions.get('window').width);
            setavailableDeviceHeight(Dimensions.get('window').height);
        };
        Dimensions.addEventListener('change', updateLayout);
        return () => {
            Dimensions.removeEventListener('change', updateLayout)
        }
    });




    useEffect(() => {
        if(currentGuess === userChoice) {
            onGameOver(pastGuesses.length);
        }
    }, [currentGuess, userChoice, onGameOver]);

    const nextGuessHandler = direction => {
        if((direction === 'lower' && currentGuess < props.userChoice) ||
            (direction === 'greater' && currentGuess > props.userChoice)
        ) {
            Alert.alert(
                'Dont\'t lie!', 
                'You know that this is wrong...',
                [{text: 'Sorry', style:"cancel"}]
            );
            return;
        }
        if(direction === 'lower') {
            currentHigh.current = currentGuess;
        }else {
            currentLow.current = currentGuess + 1;
        }
        const nextNumber = generateRandomBetween(currentLow.current, currentHigh.current, currentGuess)
        setCurrentGuess(nextNumber);
        // setRounds(curRounds => curRounds + 1);
        setPastGuesses(curPastGuesses => [nextNumber.toString(),...curPastGuesses]);
        
    }

    if(availableDeviceHeight  < 500) {
        return (
            <View style={styles.screen}>
            <Text style={DefaultStyles.bodyText}>Opponent's Guess</Text>
            <View style={styles.controls}>
            <MainButton onPress={nextGuessHandler.bind(this, 'lower')}>
                    <Ionicons 
                        name={'md-remove'} 
                        size={24}
                        color={"white"}
                    />
                </MainButton>
            <NumberContainer>{currentGuess}</NumberContainer>    
            <MainButton onPress={nextGuessHandler.bind(this, 'greater')}>
                <Ionicons
                    name={"md-add"}
                    size={24}
                    color={"white"}
                />
            </MainButton>
            </View>
            <View style={styles.listContainer}>
            {/* <ScrollView contentContainerStyle={styles.list}>
                {pastGuesses.map((guess, index) => (
                   renderListItem(guess, pastGuesses.length-index)
                ))}
            </ScrollView> */}
            <FlatList 
            keyExtractor={(item)=> item} 
            data={pastGuesses} 
            renderItem={renderListItem.bind(this, pastGuesses.length)}/>
            </View>
        </View>
        )
    }
    return (
        <View style={styles.screen}>
            <Text style={DefaultStyles.bodyText}>Opponent's Guess</Text>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card style={styles.buttonContainer}>
                <MainButton onPress={nextGuessHandler.bind(this, 'lower')}>
                    <Ionicons 
                        name={'md-remove'} 
                        size={24}
                        color={"white"}
                    />
                </MainButton>
                <MainButton onPress={nextGuessHandler.bind(this, 'greater')}>
                    <Ionicons
                        name={"md-add"}
                        size={24}
                        color={"white"}
                    />
                </MainButton>
            </Card>
            <View style={styles.listContainer}>
            {/* <ScrollView contentContainerStyle={styles.list}>
                {pastGuesses.map((guess, index) => (
                   renderListItem(guess, pastGuesses.length-index)
                ))}
            </ScrollView> */}
            <FlatList 
            keyExtractor={(item)=> item} 
            data={pastGuesses} 
            renderItem={renderListItem.bind(this, pastGuesses.length)}/>
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center'
    },
    buttonContainer : {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: Dimensions.get('window').height > 600 ? 20 : 5,
        width: 300,
        maxWidth: '90%'
    },
    listItem: {
        borderColor: 'black',
        padding: 15,
        marginVertical: 10,
        backgroundColor: 'white',
        borderWidth: 1,
        flexDirection: 'row',
        justifyContent: 'space-around'
        
    },
    list: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    controls: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '80%',
        alignItems: 'center'
    },
    listContainer: {
        width: '80%',
        flex: 1,

    }
})


export default GameScreen;