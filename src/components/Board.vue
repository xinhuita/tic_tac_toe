<template>
    <div class="board">
        <el-container>
            <el-header style="height: 70px">
                <el-menu :default-active="activeIndex" class="el-menu" mode="horizontal" active-text-color="red">
                    <el-menu-item index="1" class="play-game el-menu-item" @click="goPlay">play game</el-menu-item>
                    <el-menu-item index="2" class="view-history el-menu-item" @click="viewHistory">view history</el-menu-item>
                    <el-menu-item index="3" class="log-out el-menu-item" @click="logOut">log out</el-menu-item>
                </el-menu>
            </el-header>
            <router-view></router-view>
        </el-container>
    </div>    
</template>

<script>
export default {
    data() {
        return {
            activeIndex: '1'
        }
    },

    methods: {
        goPlay() {
            this.$router.push('/play')
        },
        viewHistory() {
            this.$router.push('/history')
        },
        logOut() {
            window.sessionStorage.clear()
            this.$router.push('/login')
        }
    }
}
</script>


<style lang="less">
    .el-menu {
        display: flex;
        justify-content: space-between;
    }

    .el-menu-item {
        background-color: rgba(0, 217, 255, 0.459);
        border-radius: 20px;
    }

    .el-menu-item:hover {
        background-color: red;
    }

</style>

