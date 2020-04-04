/*
* Desenvolvedor: Silvanei Martins;
* Email: silvaneimartins_rcc@hotmail.com;
* WhatsApp: (69) 9.8405-2620;  
* App Jogo Campo Minado;
*/
import React from 'react'
import {
    StyleSheet,
    View
} from 'react-native'

import Colors from '../utilitarios/Colors'
import Field from '../components/Field'

export default props => {
    const rows = props.board.map((row, r) => {
        const columns = row.map((field, c) => {
            return <Field
                {...field}
                key={c}
                onOpen={() => props.onOpenField(r, c)}
                onSelect={e => props.onSelectField(r, c)}
            />
        })
        return <View
            key={r}
            style={{ flexDirection: 'row' }}
        >{columns}</View>
    })

    return <View style={styles.container}>{rows}</View>
}

const styles = StyleSheet.create({
    container: {
        // flexDirection: 'row',
        backgroundColor: Colors.mineField,
    }
})
