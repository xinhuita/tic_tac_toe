<template>
    <div class="container">
        <div class="control">
            <div class="goFirst">
                <el-radio ref="radio1" v-model="goFirst" label="initiative" :disabled="radio1">initiative</el-radio>
                <el-radio ref="radio2" v-model="goFirst" label="gote" :disabled="radio2">gote</el-radio>
                <el-select ref="level" v-model="level" :disabled="levelbtn">
                    <el-option v-for="item in options" :key="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </div>
            <div class="playBtn">
                <el-button ref="play" type="primary" @click="goPlay" :disabled="playbtn">Play now!</el-button>
                <el-button type="warning" @click="reset" :disabled="resetbtn">reset</el-button>
            </div>
        </div>

        <div ref="board" class="board_container" style="display:none">
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
            isUserTurn: false,
            steps: [],
            radio1: false,
            radio2: false,
            levelbtn: false,
            playbtn: false,
            resetbtn: false
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
                this.steps.push(this.deepClone(this.boardStatus))
                const {data: respone} = await this.$http.post('board/next', data);
                // console.log(respone);
                this.boardStatus = respone.board
                this.repaintBoard();
                if (respone.ended) {
                    if (respone.winner !== this.chess && this.steps.length < 9) {
                        this.steps.push(this.deepClone(this.boardStatus));
                    }
                    this.isUserTurn = false;
                    // send request to record board steps
                    let data = {
                        token: window.sessionStorage.getItem('token'),
                        username: window.sessionStorage.getItem('username'),
                        level: this.level,
                        player: this.chess,
                        winner: respone.winner ? respone.winner : 't',
                        steps: this.steps
                    }
                    // console.log(data.steps);
                    const res = await this.$http.post('board/record', data);
                    // console.log(res);
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
                else {
                    this.isUserTurn = true;
                    this.steps.push(this.deepClone(this.boardStatus))
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
            this.radio1 = true
            this.radio2 = true
            this.levelbtn = true
            this.playbtn = true
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
                // console.log(respone);
                this.boardStatus = respone.board
                this.steps.push(this.deepClone(this.boardStatus))
                // console.log(this.steps);
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
            this.radio1= false
            this.radio2 = false
            this.levelbtn = false
            this.playbtn = false
            this.goFirst = 'initiative'
            this.$refs['board'].style.display = 'none'
            this.steps = []
        },
        deepClone(arr) {
            return JSON.parse(JSON.stringify(arr))
        }
    }
}
</script>

<style lang="less">
    .board_container {
        width: 500px;
        height: 500px;
        background-color: green;
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

    .container {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
        width: 600px;
        position: absolute;
        left: 50%;
        top: 10%;
        margin-left: -300px;

    }
    .control {
        margin-bottom: 10px;
    }
    .goFirst {
        margin-bottom: 20px;
    }

    .playBtn {
        margin-bottom: 20px;
        display: flex;
        justify-content: center;
    }

    .show {
        display: block;
    }


</style>