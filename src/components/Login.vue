<template>
    <div class='login_container'>
        <div class="login_box">
            <div class='header'>
                <img class='icon_img' src="../assets/Tic_tac_toe.svg.png" alt="">
                <div class='title'>Welcome to tic tac toe</div>
            </div>
            <el-form ref='loginFormRef' label-width="0px" class='login_form' :model='loginForm' :rules='loginFormRules'>
                <el-form-item prop="username">
                  <el-input prefix-icon="iconfont icon-user" v-model='loginForm.username'></el-input>
                </el-form-item>
                <el-form-item prop='password'>
                    <el-input prefix-icon="iconfont icon-3702mima" v-model='loginForm.password' type='password'></el-input>
                </el-form-item>
                <el-form-item class='btns'>
                    <el-button class='signup' type="signup" @click='goSignup'>sign up</el-button>
                    <el-button type="info" @click='resetLoginForm'>reset</el-button>
                    <el-button type="primary" @click='login'>log in</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                loginForm: {
                    username: '',
                    password: ''
                },
                loginFormRules: {
                    username: [{
                        required: true,
                        message: 'pleause input your username',
                        trigger: 'blur'
                    }, {
                        min: 3,
                        max: 10,
                        message: 'length should be 3-10',
                        trigger: 'blur'
                    }],
                    password: [{
                        required: true,
                        message: 'please input your password',
                        trigger: 'blur'
                    }, {
                        min: 6,
                        max: 15,
                        message: 'length should be 6-15',
                        trigger: 'blur'
                    }]
                }
            }
        },
        methods: {
            resetLoginForm() {
                //console.log(this)
                this.$refs.loginFormRef.resetFields();
            },
            login() {
                this.$refs.loginFormRef.validate(async(valid) => {
                    if (!valid) {
                        return;
                    }
                    const {data} = await this.$http.post('account/login', this.loginForm);
                    // console.log('data： ', data);
                    if (data.success) {
                        window.sessionStorage.setItem('token', data.token)
                        window.sessionStorage.setItem('username', this.loginForm.username)
                        this.$message.success('log in success')
                        this.$router.push('/board').catch(()=> {})
                    }
                    else {
                        this.$message.error('wrong username or password')
                    }
                })
            },
            goSignup() {
                this.$router.push('/signup').catch(()=> {})
            }
        }
    }
</script>

<style lang="less" scoped>
    .login_container {
        background-color: #2b4b6b;
        height: 100%;
    }
    
    .icon_img {
        width: 80px;
        height: 80px;
    }
    .login_box {
        position: absolute;
        width: 450px;
        height: 300px;
        background-color: white;
        border-radius: 3px;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        .avator_box {
            height: 130px;
            width: 130px;
            border: 1px solid #eee;
            border-radius: 50%;
            padding: 10px;
            box-shadow: 0 0 10px #ddd;
            position: absolute;
            left: 50%;
            transform: translate(-50%, -50%);
            background-color: #fff;
            img {
                width: 100%;
                height: 100%;
                border-radius: 50%;
                background-color: #eee;
            }
        }
    }
    
    .btns {
        display: flex;
        justify-content: flex-end;
    }
    
    .login_form {
        position: absolute;
        bottom: 0;
        width: 100%;
        padding: 0 20px;
        box-sizing: border-box;
    }

    .header {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100px;
    }

    .title {
        font-size: 25px;
        color: red;
    }
    
</style>