<template>
    <div class="main">
        <div>
            <h1>收啦后台管理平台</h1>
            <el-form :model="ruleForm2" status-icon ref="ruleForm2" label-width="60px" class="demo-ruleForm">
                <el-form-item label="账号：" prop="userName">
                    <el-input type="userName" autocomplete="off" class="bor" v-model="ruleForm2.userName"></el-input>
                </el-form-item>
                <el-form-item label="密码：" prop="pass">
                    <el-input type="password" autocomplete="off" class="bor" v-model="ruleForm2.pass"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm2')" class="btn">登录</el-button>
                    <el-button @click="resetForm('ruleForm2')" class="btn btn1">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    // import {mapMutations} from 'vuex';

    export default {
        name: "Login",
        data() {
            return {
                ruleForm2: {
                    userName: '',
                    pass: ''
                }
            };
        },
        methods: {
            // ...mapMutations(['changeLogin']),
            submitForm(formName) {
                if (this.ruleForm2.userName == '' && this.ruleForm2.pass == '') {
                    alert('账号密码不能为空');
                    return
                }
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let formData = new FormData();
                        formData.append('phoneNumber', this.ruleForm2.userName);
                        formData.append('password', this.ruleForm2.pass);
                        this.axios.post('https://www.innothinking.cn/login', formData).then((res) => {
                            if (res.data.coed == 1) {
                                this.$router.push({path: '/HelloWorld'});
                            } else {
                                alert('账号或密码输入错误！请重新输入');
                            }
                            // console.log(res);
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
                // this.axios.post('https://www.innothinking.cn/login').then(res=>{
                //     console.log(res);
                // })
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        }
    }
</script>

<style scoped>
    .main {
        height: 100%;
        display: block;
        background: url("../../../static/images/VCG41N588365450.jpg") no-repeat;
        background-size: 100% 100%;
        position: relative;
    }

    .main > div {
        position: absolute;
        top: 20%;
        left: 50%;
        transform: translate(-50%);
        height: 500px;
        width: 500px;
        background: #ffffff;
    }

    .demo-ruleForm {
        width: 80%;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%);
    }

    .demo-ruleForm > div {
        border-bottom: 1px solid #bbbbbb;
    }

    h1 {
        margin-top: 47px;
        letter-spacing: 14px;
        text-align: center;
    }

    .demo-ruleForm > div:last-child {
        border: none;
    }

    .btn {
        background: #000000;
        color: #ffffff;
        border: none;
        display: block;
        width: 82%;
        margin: 10px 0;
    }

    .btn1 {
        background: #ccc;
    }
</style>
