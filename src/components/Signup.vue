<template>
    <div class='signup_container'> 
        <div class="signup_box">
            <!-- 头像区域 -->
            <div class='header'>
                <div class='title'>Please signup</div>
            </div>
            <el-form ref='signupFormRef' label-width="0px" class='signup_form' :model='signupForm' :rules='signupFormRules'>
            <!-- 用户名 -->
            <el-form-item prop="username">
                <el-input prefix-icon="iconfont icon-user" v-model='signupForm.username'></el-input>
            </el-form-item>
            <!-- 密码 -->
            <el-form-item prop='password'>
                <el-input prefix-icon="iconfont icon-3702mima" v-model='signupForm.password' type='password'></el-input>
            </el-form-item>
            <!-- 按钮区域 -->
            <el-form-item class='btns'>
                <el-button type="login" @click='goLogin'>log in</el-button>
                <el-button type="info" @click='resetSignupForm'>reset</el-button>
                <el-button class='signup' type="primary" @click='signup'>sign up</el-button>
            </el-form-item>
        </el-form>
        </div>
    </div>
</template>


<script>
export default {
    data() {
        return {
            signupForm: {
                username: '',
                password: ''
            },
            //这是表单的验证规则对象
                signupFormRules: {
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
        resetSignupForm() {
            this.$refs.signupFormRef.resetFields()
        },
        signup() {
            // send request
            this.$refs.signupFormRef.validate(async (valid) => {
                if (!valid) {
                    return;
                    alert('no valid name or password')
                }
                const response = await this.$http.post('account/signup', this.signupForm)
                console.log(response);
                this.$router.push('/login').catch(()=> {})
            })
        },
        goLogin() {
            this.$router.push('/login')
        }
    }
}
</script>

<style lang="less" scoped>
    .signup_container {
        background-color: #2b4b6b;
        height: 100%;
    }

    .signup_box {
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

    .signup_form {
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

    .btns {
        display: flex;
        justify-content: flex-end;
    }
</style>