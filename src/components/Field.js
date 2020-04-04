/*
* Desenvolvedor: Silvanei Martins;
* Email: silvaneimartins_rcc@hotmail.com;
* WhatsApp: (69) 9.8405-2620;  
* App Jogo Campo Minado;
*/
import React from 'react'
import Colors from '../utilitarios/Colors'

import {
    Text,
    StyleSheet,
    View,
    TouchableWithoutFeedback,
} from 'react-native'

import params from '../params'
import Mine from './Mine'
import Flag from './Flag'

export default props => {
    const { mined, opened, nearMines, exploded, flagged } = props

    //Estilos Field;
    const styleField = [styles.field]
    if (opened) {
        styleField.push(styles.opened)
    }
    if (exploded) {
        styleField.push(styles.exploded)
    }
    if (flagged) {
        styleField.push(styles.flagged)
    }
    if (!opened && !exploded) {
        styleField.push(styles.regular)
    }

    let color = null
    if (nearMines > 0) {
        if (nearMines == 1) {
            color = Colors.secondary
        }
        if (nearMines > 2 && nearMines < 6) {
            color = Colors.redDark
        }
        if (nearMines >= 6) {
            color = Colors.violet
        }
    }

    return (
        <TouchableWithoutFeedback
            onPress={props.onOpen}
            onLongPress={props.onSelect}
        >
            <View style={styleField} >
                {!mined && opened && nearMines > 0 ?
                    <Text style={[styles.label, { color: color }]}
                    >{nearMines}</Text> : false}
                {mined && opened ? <Mine /> : false}
                {flagged && !opened ? <Flag /> : false}
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    field: {
        height: params.blockSize,
        width: params.blockSize,
        borderWidth: params.borderSize,
    },
    regular: {
        backgroundColor: Colors.background,
        borderLeftColor: Colors.borderLeft,
        borderTopColor: Colors.borderTop,
        borderRightColor: Colors.borderRight,
        borderBottomColor: Colors.borderBottom,
    },
    opened: {
        backgroundColor: Colors.background,
        borderColor: Colors.borderColors,
        alignItems: 'center',
        justifyContent: 'center',
    },
    label: {
        fontWeight: 'bold',
        fontSize: params.fontSize,
    },
    exploded: {
        backgroundColor: Colors.red,
        borderColor: Colors.red,
    }
})
