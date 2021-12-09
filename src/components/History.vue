<template>
    <div class="container">
        <el-table :data="tableData" style="width: 100%; margin-left: 20px" :row-class-name="tableRowClassName">
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
            <a href="javascript:void(0)" @click="seeDetail">See Detail</a>
            </el-table-column>
  </el-table>

    </div>
</template>

<script>
export default {
    data() {
        return {
            tableData: [
            ]
        }
    },
    created() {
        this.getRecords();
    },
    methods: {
        tableRowClassName({row, rowIndex}) {
            if (rowIndex === 1) {
                return 'warning-row';
            } else if (rowIndex === 0 || rowIndex === 2) {
                return 'success-row';
            }
            else if (rowIndex === 3) {
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
        seeDetail() {

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
   
</style>