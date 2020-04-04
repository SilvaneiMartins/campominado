import React from 'react'
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    Modal,
} from 'react-native'

import Colors from '../utilitarios/Colors'

export default props => {
    return (
        <Modal
            onRequestClose={props.onCancel}
            visible={props.isVisible}
            animationType='slide'
            transparent={true}
        >
            <View
                style={styles.frame}
            >
                <View style={styles.container} >
                    <Text style={styles.title} >Selecione o Nível</Text>
                    <TouchableOpacity
                        style={[styles.button, styles.bgEasy]}
                        onPress={() => props.onLevelSelected(0.1)}
                    >
                        <Text style={styles.buttonLabel} >Fácil</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.button, styles.bgNormal]}
                        onPress={() => props.onLevelSelected(0.2)}
                    >
                        <Text style={styles.buttonLabel} >Intermediário</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.button, styles.bgHard]}
                        onPress={() => props.onLevelSelected(0.3)}
                    >
                        <Text style={styles.buttonLabel} >Difícil</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    frame: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.6)',
    },
    container: {
        backgroundColor: Colors.mineField,
        alignItems: 'center',
        padding: 15,
        width: '90%',
        borderRadius: 8,
    },
    title: {
        fontSize: 27,
        fontWeight: 'bold',
    },
    button: {
        display: 'flex',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        width: '90%',
        marginTop: 10,
        padding: 5,
        borderRadius: 8,
        shadowColor: Colors.asphalt,
        shadowOpacity: 0.5,
        shadowOffset: {
            height: 10,
            width: 0
        },
        shadowRadius: 25,
    },
    buttonLabel: {
        fontSize: 20,
        color: `${Colors.mineField}`,
        fontWeight: 'bold',
    },
    bgEasy: {
        backgroundColor: Colors.bgEasy,
    },
    bgNormal: {
        backgroundColor: Colors.bgNormal,
    },
    bgHard: {
        backgroundColor: Colors.bgHard,
    }
})
