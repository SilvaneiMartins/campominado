/*
* Desenvolvedor: Silvanei Martins;
* Email: silvaneimartins_rcc@hotmail.com;
* WhatsApp: (69) 9.8405-2620;  
* App Jogo Campo Minado;
*/
import React, { Component } from 'react'
import {
    Text,
    View,
    StyleSheet,
    Alert,
    TouchableOpacity,
} from 'react-native'
import {
    createMinedBoard,
    cloneBoard,
    openField,
    hadExplosion,
    wonGame,
    showMines,
    investFlag,
    flagsUsed,
} from './utilitarios/functions'

import params from './params'
import MineField from './components/MineField'
import Colors from './utilitarios/Colors'
import Header from './components/Header'
import LevelSelection from './screens/LevelSelection'

export default class App extends Component {
    constructor(props) {
        super(props)
        this.state = this.createState()
    }

    minesAmount = () => {
        const cols = params.getColumnsAmount()
        const rows = params.getRowsAmount()
        return Math.ceil(cols * rows * params.difficultLevel)
    }

    createState = () => {
        const cols = params.getColumnsAmount()
        const rows = params.getRowsAmount()
        return {
            board: createMinedBoard(rows, cols, this.minesAmount()),
            won: false,
            lost: false,
            showLevelSelection: false,
        }
    }

    onOpenField = (row, column) => {
        const board = cloneBoard(this.state.board)
        openField(board, row, column)
        const lost = hadExplosion(board)
        const won = wonGame(board)

        if (lost) {
            showMines(board)
            Alert.alert('Perdeuuuuu!', 'GAME OVER!')
        }
        if (won) {
            Alert.alert('Parabéns!', 'VOCE VENCEU!')
        }
        this.setState({ board, lost, won })
    }

    onSelectField = (row, column) => {
        const board = cloneBoard(this.state.board)
        investFlag(board, row, column)
        const won = wonGame(board)

        if (won) {
            Alert.alert('Parabéns!', 'VOCE VENCEU!')
        }
        this.setState({ board, won })
    }

    onLevelSelected = level => {
        params.difficultLevel = level
        this.setState(this.createState())
    }

    render() {
        return (
            <View style={styles.container} >
                <LevelSelection
                    isVisible={this.state.showLevelSelection}
                    onLevelSelected={this.onLevelSelected}
                    onCancel={() => this.state({showLevelSelection: false})}
                />

                <Header
                    flagsLeft={this.minesAmount() - flagsUsed(this.state.board)}
                    onNewGame={() => this.setState(this.createState())}
                    onSelectNivel={() => this.setState({showLevelSelection: true})}
                />

                <View style={styles.board}>
                    <MineField
                        board={this.state.board}
                        onOpenField={this.onOpenField}
                        onSelectField={this.onSelectField}
                    />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    board: {
        alignItems: 'center',
        backgroundColor: Colors.board,
    }
})
