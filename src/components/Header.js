/*
* Desenvolvedor: Silvanei Martins;
* Email: silvaneimartins_rcc@hotmail.com;
* WhatsApp: (69) 9.8405-2620;  
* App Jogo Campo Minado;
*/
import React from 'react'
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
} from 'react-native'

import Flag from './Flag'
import Colors from '../utilitarios/Colors'

export default props => {
    return (
        <View style={styles.container} >
            <View style={styles.flagContainer} >
                <TouchableOpacity
                    onPress={props.onFlagPress}
                    style={styles.flagButton}
                >
                    <Flag bigger />
                </TouchableOpacity>

                <Text style={styles.flagLeft} >= {props.flagsLeft} </Text>
            </View>

            <TouchableOpacity
                style={styles.buttonLevel}
                onPress={props.onSelectNivel}
            >
                <Text  style={styles.buttonLevelText} >Nível</Text>
            </TouchableOpacity>

            <View >
                <TouchableOpacity
                    style={styles.button}
                    onPress={props.onNewGame}
                >
                    <Text style={styles.buttonLabel} >Novo Jogo</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: Colors.board,
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingTop: 20,
        paddingHorizontal: 20,
        width: '100%',
    },
    flagContainer: {
        flexDirection: 'row',
    },
    flagButton: {
        marginTop: 10,
        minWidth: 30,
    },
    flagLeft: {
        fontSize: 30,
        fontWeight: 'bold',
        paddingTop: 5,
        marginLeft: 20,
    },
    button: {
        backgroundColor: Colors.asphalt,
        padding: 7,
        borderRadius: 5,
    },
    buttonLevel: {
        backgroundColor: Colors.asphalt,
        padding: 7,
        borderRadius: 5,
    },
    buttonLevelText: {
        fontSize: 20,
        color: `${Colors.brancoQuase}`,
        fontWeight: 'bold',
    },
    buttonLabel: {
        fontSize: 20,
        color: `${Colors.brancoQuase}`,
        fontWeight: 'bold',
    },
})