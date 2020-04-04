/*
* Desenvolvedor: Silvanei Martins;
* Email: silvaneimartins_rcc@hotmail.com;
* WhatsApp: (69) 9.8405-2620;  
* App Jogo Campo Minado;
*/
//Cria as Linhas e Colunas;
const createBoard = (rows, columns) => {
    return Array(rows).fill(0).map((_, row) => {
        return Array(columns).fill(0).map((_, column) => {
            return {
                row,
                column,
                opened: false,
                flagged: false,
                mined: false,
                exploded: false,
                nearMines: 0,
            }
        })
    })
}

//Minas Plantadas;
const spreadMines = (board, minesAmount) => {
    const rows = board.length
    const columns = board[0].length
    let minesPlanted = 0

    while (minesPlanted < minesAmount) {
        const rowSel = parseInt(Math.random() * rows, 10)
        const columnSel = parseInt(Math.random() * columns, 10)

        if (!board[rowSel][columnSel].mined) {
            board[rowSel][columnSel].mined = true
            minesPlanted++
        }
    }
}

/*
* Cria o Tabuleiro
* Recebe as Linhas e Colunas;
* Planta as Minas Plantadas;  
*/
const createMinedBoard = (rows, columns, minesAmount) => {
    const board = createBoard(rows, columns)
    spreadMines(board, minesAmount)

    return board
}

//Função responsavel por clonar o tabuleiro;
const cloneBoard = board => {
    return board.map(rows => {
        return rows.map(field => {
            return { ...field }
        })
    })
}

//Função para pegar os visinhos;
const getNeighbors = (board, row, column) => {
    const neighbors = []
    const rows = [row - 1, row, row + 1]
    const columns = [column - 1, column, column + 1]
    rows.forEach(r => {
        columns.forEach(c => {
            const different = r !== row || c !== column
            const validRow = r >= 0 && r < board.length
            const validColumn = c >= 0 && c < board[0].length

            if (different && validRow && validColumn) {
                neighbors.push(board[r][c])
            }
        })
    })
    return neighbors
}

//Função para verificar se avizinhaça e segura;
const safeNeighborhood = (board, row, column) => {
    const safes = (result, neighbor) => result && !neighbor.mined
    return getNeighbors(board, row, column)
        .reduce(safes, true)
}

//Função responsavel por abrir um campo;
const openField = (board, row, column) => {
    const field = board[row][column]
    if (!field.opened) {
        field.opened = true
        if (field.mined) {
            field.exploded = true
        } else if (safeNeighborhood(board, row, column)) {
            getNeighbors(board, row, column)
                .forEach(n => openField(board, n.row, n.column))
        } else {
            const neighbors = getNeighbors(board, row, column)
            field.nearMines = neighbors
                .filter(n => n.mined).length
        }
    }
}

//Função que percorre todo o tabuleiro;
const fields = board => [].concat(...board)

//Função para verificar caso tenha um campo explodido;
const hadExplosion = board => fields(board)
    .filter(field => field.exploded).length > 0

//Função para verificar caso esxista campo pendente;
const pendding = field => (field.mined && !field.flagged)
    || (!field.mined && !field.opened)

//Função que verifica, jogador ganhou o game;
const wonGame = board => fields(board)
    .filter(pendding).length === 0

//Função que monstra todas as minas apos game over;
const showMines = board => fields(board)
    .filter(field => field.mined)
    .forEach(field => field.opened = true)

//Função responsavel por marcar um campo com a bandeira;
const investFlag = (board, row, column) => {
    const field = board[row][column]
    field.flagged = !field.flagged
}

/*
* Função que calcula quantas FLAG já foi usada, 
* para marcar no tabuleiro. 
*/
const flagsUsed = board => fields(board)
    .filter(field => field.flagged).length

export {
    createMinedBoard,
    cloneBoard,
    openField,
    hadExplosion,
    wonGame,
    showMines,
    investFlag,
    flagsUsed,
}

