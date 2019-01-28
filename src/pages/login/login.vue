<template>
    <div class="login">
        <div class="login_box">
            <div class="login_title">
                智能跟投后台管理系统
            </div>
            <div class="place">登录</div>
            <div class="login_main">
                <a-input placeholder="请输入用户名" v-model="userName" ref="userNameInput">
                    <a-icon slot="prefix" type="user" />
                    <a-icon v-if="userName" slot="suffix" type="close-circle" @click="emptyUser" />
                </a-input>
                <a-input type="password" placeholder="请输入密码" v-model="password" ref="passWordInput">
                    <a-icon slot="prefix" type="form" />
                    <a-icon v-if="password" slot="suffix" type="close-circle" @click="emptyPass" />
                </a-input>
            </div>
            <div class="button_box">
                <a-button type="primary" :loading="isloading" @click="login">
                    登录
                </a-button>
            </div>
        </div>
    </div>
</template>

<script>
    // import { loginFun } from '../../utils/request'
    export default {
        name: "login",
        data(){
            return{
                userName:'',
                password:'',
                isloading:false
            }
        },
        components:{

        },
        methods:{
            login(){
                if(!this.userName){
                    this.$message.error('请输入用户名');
                    return
                }
                if(!this.password){
                    this.$message.error('请输入密码');
                    return
                }
                this.$router.replace('/home')
                // loginFun(this.userName,this.password)
                //     .then(res=>{
                //         console.log(res)
                //
                //     })
                //     .catch(err=>{
                //         console.log(err)
                //     })
            },
            emptyUser(){
                this.userName = ''
            },
            emptyPass(){
                this.password = ''
            }
        }
    }
</script>

<style scoped lang="less">
    .login{
        width:100%;
        height:100%;
        position: relative;
        background: #000000;
        .login_box{
            width:500px;
            height:340px;
            position: absolute;
            top:50%;
            left:50%;
            transform: translate(-50%,-50%);
            background: #fff;
            border-radius: 5px;
            .login_title{
                font-size: 24px;
                color: #1890ff;
                text-align: center;
                margin-top: 30px;
            }
            .place{
                font-size: 20px;
                color: #1890ff;
                text-align: left;
                margin-top: 20px;
                padding-left: 34px;
                box-sizing: border-box;
            }
            .login_main{
                padding:0px 34px;
                margin:10px 0px;
                .ant-input-affix-wrapper{
                    margin:10px 0px;
                    height:45px;
                    .ant-input-prefix{
                        i{
                            font-size: 25px;
                        }
                    }
                    .ant-input:not(:first-child){
                        padding-left:40px;
                    }
                }
            }
        }
        .button_box{
            padding:10px 0px;
            text-align: center;
            .ant-btn{
                width:300px;
                height:45px;
                line-height: 45px;
            }
        }
    }
</style>
<style>
    .login_main .ant-input-affix-wrapper .ant-input:not(:first-child){
        padding-left:45px;
        font-size: 16px;
    }
</style>