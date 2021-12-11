<template>
    <div class='login_container'>
        <div class="login_box">
            <!-- 头像区域 -->
            <div class='header'>
                <img class='icon_img' src="../assets/Tic_tac_toe.svg.png" alt="">
                <div class='title'>Welcome to tic tac toe</div>
            </div>
            <!-- 登陆表单区域 -->
            <el-form ref='loginFormRef' label-width="0px" class='login_form' :model='loginForm' :rules='loginFormRules'>
                <!-- 用户名 -->
                <el-form-item prop="username">
                  <el-input prefix-icon="iconfont icon-user" v-model='loginForm.username'></el-input>
                </el-form-item>
                <!-- 密码 -->
                <el-form-item prop='password'>
                    <el-input prefix-icon="iconfont icon-3702mima" v-model='loginForm.password' type='password'></el-input>
                </el-form-item>
                <!-- 按钮区域 -->
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
                //这是登陆表单的数据绑定对象
                loginForm: {
                    username: '',
                    password: ''
                },
                //这是表单的验证规则对象
                loginFormRules: {
                    //验证用户名是否合法
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
                    //验证密码是否合法
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
            //点击重置按钮，重置登陆表单
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
                    console.log('data： ', data);
                    // this.$message.success('登陆成功！')
                    //     // 1.将登陆成功之后的token,保存到客户端的sessionStorage
                    //     // 1.1 项目中除了登陆以外的其他API接口，必须在登录以后才能访问
                    //     // 1.2 token应只在当前网站打开期间生效，所以将token保存在sessionStorage中
                    // window.sessionStorage.setItem('token', res.data.token);
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