<template>
    <div class="container">
        <div ref="detail_board" class="detail_board">
            <el-button-group class="btn_control">
                <el-button ref="btn_1" type="primary" icon="el-icon-arrow-left" @click="last_step" disabled>上一步</el-button>
                <el-button ref="btn_2" type="primary" @click="next_step">下一步<i class="el-icon-arrow-right el-icon--right"></i></el-button>
                <i class="el-icon-close" @click="closeBoard"></i>
            </el-button-group>
            <div ref="your_role" class="role">Your Chess: {{your_role}}</div>
            <div ref="ai_role" class="role">AI's Chess: {{ai_role}}</div>
            <div ref="board" class="board_container">
                <div class="col" ref="grid-0-0"></div>
                <div class="col" ref="grid-0-1"></div>
                <div class="col" ref="grid-0-2"></div>
            
                <div class="col" ref="grid-1-0"></div>
                <div class="col" ref="grid-1-1"></div>
                <div class="col" ref="grid-1-2"></div>
        
                <div class="col" ref="grid-2-0"></div>
                <div class="col" ref="grid-2-1"></div>
                <div class="col" ref="grid-2-2"></div>
            </div>
        </div>
        <div ref="table_container">
            <el-table :data="tableData" style="width: 100%; margin-left: 20px;" :row-class-name="tableRowClassName" @cell-click="seeDetail"> 
            <el-table-column
            prop="id"
            label="id"
            width="280">
            </el-table-column>
            <el-table-column
            prop="level"
            label="level"
            width="280">
            </el-table-column>
            <el-table-column
            prop="player"
            label="player">
            </el-table-column>
            <el-table-column
            prop="winner"
            label="winner"
            width="280">
            </el-table-column>
            <el-table-column
            prop="timestamp"
            label="timestamp">
            </el-table-column>
            <el-table-column
            prop="detail"
            label="detail">
                <a href="javascript:void(0)">See Detail</a>
            </el-table-column>
        </el-table>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            curStep: 0,
            curGame: [],
            your_role: '',
            ai_role: '',
            tableData: [
                {
                    id: 1,
                    level: 'easy',
                    player: 'x',
                    winner: 'x',
                    timestamp: '2021-12-01',
                    steps:[
                            [
                                ['_','x','_'],
                                ['_','_','_'],
                                ['_','_','_']
                            ],
                            [
                                ['_','x','_'],
                                ['o','_','_'],
                                ['_','_','_']
                            ],
                            [
                                ['_','x','_'],
                                ['o','x','_'],
                                ['_','_','_']
                            ],
                            [
                                ['_','x','_'],
                                ['o','x','o'],
                                ['_','_','_']
                            ],
                            [
                                ['_','x','_'],
                                ['o','x','o'],
                                ['x','_','_']
                            ],
                        ]
                },
                {
                    id: 2,
                    level: 'medium',
                    player: 'x',
                    winner: 'y',
                    timestamp: '2021-12-02',
                    steps:[
                            [
                                ['_','x','_'],
                                ['_','_','_'],
                                ['_','_','_']
                            ],
                            [
                                ['_','x','_'],
                                ['o','_','_'],
                                ['_','_','_']
                            ],
                            [
                                ['_','x','_'],
                                ['o','x','_'],
                                ['_','_','_']
                            ],
                            [
                                ['_','x','_'],
                                ['o','x','o'],
                                ['_','_','_']
                            ],
                            [
                                ['_','x','_'],
                                ['o','x','o'],
                                ['x','_','_']
                            ],
                        ]
                },
                {
                    id: 3,
                    level: 'hard',
                    player: 'x',
                    winner: 't',
                    timestamp: '2021-12-03',
                    steps:[
                            [
                                ['_','x','_'],
                                ['_','_','_'],
                                ['_','_','_']
                            ],
                            [
                                ['_','x','_'],
                                ['o','_','_'],
                                ['_','_','_']
                            ],
                            [
                                ['_','x','_'],
                                ['o','x','_'],
                                ['_','_','_']
                            ],
                            [
                                ['_','x','_'],
                                ['o','x','o'],
                                ['_','_','_']
                            ],
                            [
                                ['_','x','_'],
                                ['o','x','o'],
                                ['x','_','_']
                            ],
                        ]
                },
                {
                    id: 4,
                    level: 'hard',
                    player: 'o',
                    winner: 'x',
                    timestamp: '2021-12-04'
                },
                {
                    id: 3,
                    level: 'hard',
                    player: 'x',
                    winner: 't',
                    timestamp: '2021-12-03'
                },
                {
                    id: 4,
                    level: 'hard',
                    player: 'o',
                    winner: 'x',
                    timestamp: '2021-12-04'
                }
            ]
        }
    },
    async created() {
        await this.getRecords();
    },
    methods: {
        tableRowClassName({row, rowIndex}) {
            if (row.winner === 't') {
                return 'warning-row';
            } else if (row.player === row.winner) {
                return 'success-row';
            }
            else {
                return 'lose-row'
            }
            return '';
        },
        async getRecords() {
            let data = {
                username: window.sessionStorage.getItem('username'),
                token: window.sessionStorage.getItem('token')
            }
            const {data: response} = await this.$http.get(`board/record?username=${data.username}&token=${data.token}`);
            console.log(response);
            this.tableData = response.matches;
        },
        seeDetail(row, col, cell, event) {
            this.$refs['btn_1'].disabled = true;
            this.$refs['btn_2'].disabled = false
            this.checkBtnStatus();
            let steps = row.steps;
            console.log(steps);
            this.your_role = row.player;
            this.ai_role = row.player === 'x' ? 'o' : 'x';
            this.curStep = 1;
            this.curGame = steps;
            this.repaintBoard(steps[0]);
            this.$refs['detail_board'].style.display = 'block';
            this.$refs['table_container'].style.opacity = 0.3;
            this.checkBtnStatus()
        },
        closeBoard() {
            this.$refs['detail_board'].style.display = 'none';
            this.$refs['table_container'].style.opacity = 1;
            this.curStep = 1;
            this.checkBtnStatus()
            
        },
        repaintBoard(board) {
            for (let i = 0; i < board.length; i++) {
                for (let j = 0; j < board[0].length; j++) {
                    let ref = 'grid-' + i + '-' + j
                    if (board[i][j] !== '_') {
                        this.$refs[ref].innerText = board[i][j]
                    }
                    else {
                        this.$refs[ref].innerText = ''
                    }
                }
            }
        },
        next_step() {
            if (this.curStep <= this.curGame.length) {
                let curBoard = this.curGame[this.curStep];
                this.repaintBoard(curBoard);
                this.curStep += 1;
            }
            this.checkBtnStatus()
        },
        last_step() {
            if (this.curStep >= 1) {
                this.curStep -= 1;
                let curBoard = this.curGame[this.curStep -1];
                this.repaintBoard(curBoard)
            }
            this.checkBtnStatus()
        },
        checkBtnStatus() {
            if (this.curStep <= 1) {
                this.$refs['btn_1'].disabled = true
            }
            else if (this.curStep >= this.curGame.length) {
                this.$refs['btn_2'].disabled = true
            }
            else {
                this.$refs['btn_1'].disabled = false
                this.$refs['btn_2'].disabled = false
            }
        }
    }
}
</script>

<style lang="less">

    .el-table .warning-row {
        background: #F0E68C;
  }

    .el-table .success-row {
        background: #7CFC00;
  }

    .el-table .lose-row {
        background: #FFC0CB;
  }
    .detail_board {
        width: 240px;
        margin: 0 auto;
        display: none;
    }
    .el-icon-close {
        margin-left: 20px;
    }

    .board_container {
        width: 500px;
        height: 500px;
        background-color: green;
        position: absolute;
        left: 50%;
        top: 45%;
        margin-left: -250px;
        margin-top: -250px;
        grid-template-columns: repeat(3,1fr);
        grid-template-rows: repeat(3, 1fr);
        grid-gap: 1px;
        display: grid;
        z-index: 2;
    }

    .col {
        background-color: pink;
        font-size: 100px;
        text-align: center;
    }

</style>