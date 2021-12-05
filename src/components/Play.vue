<template>
    <div class="container">
        <div class="control">
            <div class="goFirst">
                <el-radio ref="radio1" v-model="goFirst" label="initiative">initiative</el-radio>
                <el-radio ref="radio2" v-model="goFirst" label="gote">gote</el-radio>
                <el-select ref="level" v-model="level">
                    <el-option v-for="item in options" :key="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </div>
            <div class="playBtn">
                <el-button type="primary" @click="goPlay">Play now!</el-button>
                <el-button type="warning" @click="reset">reset</el-button>
            </div>
        </div>

        <div ref="board" class="board_container">
            <div class="col" ref="grid-0-0" @click="placeChess(0,0)"></div>
            <div class="col" ref="grid-0-1" @click="placeChess(0,1)"></div>
            <div class="col" ref="grid-0-2" @click="placeChess(0,2)"></div>
        
            <div class="col" ref="grid-1-0" @click="placeChess(1,0)"></div>
            <div class="col" ref="grid-1-1" @click="placeChess(1,1)"></div>
            <div class="col" ref="grid-1-2" @click="placeChess(1,2)"></div>
    
            <div class="col" ref="grid-2-0" @click="placeChess(2,0)"></div>
            <div class="col" ref="grid-2-1" @click="placeChess(2,1)"></div>
            <div class="col" ref="grid-2-2" @click="placeChess(2,2)"></div>
        </div>
    </div>
    
</template>

<script>
export default {
    data() {
        return {
            boardStatus: [
                          ['_','_','_'],
                          ['_','_','_'],
                          ['_','_','_']
                        ],
            chess: 'x',
            goFirst: 'initiative',
            options: [
                {
                    value: 'easy',
                    label: 'easy'
                },
                {
                    value: 'medium',
                    label: 'medium'
                },
                {
                    value: 'hard',
                    label: 'hard'
                }
            ],
            level: 'easy',
            isUserTurn: false
        }
    },

    methods: {
        async placeChess(i,j) {
            if (this.boardStatus[i][j] === '_' && this.isUserTurn) {
                let ref = 'grid-' + i + '-' + j
                this.$refs[ref].innerText = this.chess
                this.boardStatus[i][j] = this.chess;
                let data = {
                    level: this.level,
                    player: this.goFirst === 'gote' ? 'o' : 'x',
                    board: this.boardStatus
                }
                const {data: respone} = await this.$http.post('board/next', data);
                console.log(respone);
                this.boardStatus = respone.board
                this.repaintBoard();
                this.isUserTurn = true
                if (respone.ended) {
                    this.isUserTurn = false;
                    if (respone.winner === this.chess) {
                        this.$message.success('You win!')
                    }
                    else if (respone.winner === ''){
                        this.$message.warning('Tie')
                    }
                    else {
                        this.$message.error('You lose')
                    }
                }
            }
        },
        repaintBoard() {
            for (let i = 0; i < this.boardStatus.length; i++) {
                for (let j = 0; j < this.boardStatus[0].length; j++) {
                    let ref = 'grid-' + i + '-' + j
                    if (this.boardStatus[i][j] !== '_') {
                        this.$refs[ref].innerText = this.boardStatus[i][j]
                    }
                    else {
                        this.$refs[ref].innerText = ''
                    }
                }
            }
        },
        async goPlay() {
            this.$refs['board'].style.display = 'grid'
            this.$refs['radio1'].disabled = true
            this.$refs['radio2'].disabled = true
            this.$refs['level'].disabled = true
            this.chess = this.goFirst === 'initiative' ? 'x' : 'o'
            if (this.goFirst === 'gote') {
                this.isUserTurn = false;
                // send request
                let data = {
                    level: this.level,
                    player: this.goFirst === 'gote' ? 'o' : 'x',
                    board: this.boardStatus
                }
                const {data: respone} = await this.$http.post('board/next', data)
                console.log(respone);
                this.boardStatus = respone.board
                this.repaintBoard()
                this.isUserTurn = true
            }
            else {
                this.isUserTurn = true
            }
        },
        reset() {
            this.boardStatus = [
                          ['_','_','_'],
                          ['_','_','_'],
                          ['_','_','_']
                        ];
            this.repaintBoard()
            this.$refs['radio1'].disabled = false
            this.$refs['radio2'].disabled = false
            this.$refs['level'].disabled = false
            this.goFirst = 'initiative'
            this.$refs['board'].style.display = 'none'
        }
    }
}
</script>

<style lang="less">
    .board_container {
        width: 500px;
        height: 500px;
        background-color: green;
        position: absolute;
        left: 50%;
        top: 50%;
        margin-left: -250px;
        margin-top: -250px;
        grid-template-columns: repeat(3,1fr);
        grid-template-rows: repeat(3, 1fr);
        grid-gap: 1px;
        display: none;
    }

    .col {
        background-color: pink;
        font-size: 100px;
        text-align: center;
    }

    .goFirst {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .playBtn {
        display: flex;
        justify-content: center;
        margin-top: 50px;
    }

    .show {
        display: block;
    }


</style>