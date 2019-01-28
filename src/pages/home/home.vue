<template>
    <div class="home">
        <a-layout id="components-layout-demo-top-side-2" style="height:100%;">
            <a-layout-header class="header">
                <div class="title">
                    基金跟投管理系统
                </div>
                <div class="logout">
                    <p>yunliang<a-icon type="down" /></p>
                    <ul>
                        <li @click="logout">退出</li>
                    </ul>
                </div>
            </a-layout-header>
            <a-layout style="height:100%;">
                <a-layout-sider
                    width="200"
                    style="background: #fff;"
                    collapsible
                    v-model="collapsed"
                >
                    <a-menu :defaultSelectedKeys="defaultSelectedKeys"
                            mode="inline"
                            :defaultOpenKeys="['sub1']"
                            @click="menu_change"
                    >
                        <a-sub-menu
                                key="sub1"
                        >
                            <span slot="title"><a-icon type="user" /><span>基金跟投</span></span>
                            <a-menu-item key="0">
                                <router-link to="/home">桌面</router-link>
                            </a-menu-item>
                            <a-menu-item key="1">
                                <router-link to="/home/product_management">产品管理</router-link>
                            </a-menu-item>
                            <a-menu-item key="2">
                                <router-link to="/home/fund_management">基金管理</router-link>
                            </a-menu-item>
                            <a-menu-item key="3">
                                <router-link to="/home/hs300_management">沪深300管理</router-link>
                            </a-menu-item>
                        </a-sub-menu>
                    </a-menu>
                </a-layout-sider>
                <a-layout style="padding: 0 24px 24px">
                    <a-breadcrumb style="margin: 16px 0">
                        <a-breadcrumb-item>{{breadcrumb}}</a-breadcrumb-item>
                    </a-breadcrumb>
                    <a-layout-content :style="{ background: '#fff', padding: '24px', margin: 0, minHeight: '280px',height:'100%',overflowX:'hidden',overflowY:'auto' }">
                        <router-view />
                    </a-layout-content>
                </a-layout>
            </a-layout>
        </a-layout>
    </div>
</template>

<script>
    export default {
        name: "home",
        data () {
            return {
                collapsed: false,
                defaultSelectedKeys:['0'],
                breadcrumb:'桌面'
            }
        },
        beforeMount(){
            this.resetDefaultSelectedKyes()
        },
        mounted(){

        },
        methods:{
            menu_change({ keyPath }){
                switch (keyPath[0]) {
                    case '0' : this.breadcrumb = '桌面';break;
                    case '1' : this.breadcrumb = '产品管理';break;
                    case '2' : this.breadcrumb = '基金管理';break;
                    case '3' : this.breadcrumb = '沪深300管理';break;
                }
            },
            logout(){
                this.$router.push('/')
            },
            resetDefaultSelectedKyes(){
                var name = this.$route.name;
                switch (name) {
                    case 'index' : this.defaultSelectedKeys = ['0'];this.breadcrumb = '桌面';break;
                    case 'product_management' : this.defaultSelectedKeys = ['1'];this.breadcrumb = '产品管理';break;
                    case 'fund_management' : this.defaultSelectedKeys = ['2'];this.breadcrumb = '基金管理';break;
                    case 'hs300_management' : this.defaultSelectedKeys = ['3'];this.breadcrumb = '沪深300管理';break;
                }
            }
        }
    }
</script>

<style scoped lang="less">
    .home{
        width:100%;
        height:100%;
        .ant-layout-header{
            background: #1890FF;
            .title{
                float:left;
                font-size: 24px;
                color:#fff;
            }
            .logout{
                float:right;
                position: relative;
                p{
                    border-right:1px solid transparent;
                    border-left:1px solid transparent;
                    margin:0px;
                    padding:0px 20px;
                    color:#fff;
                    cursor: pointer;
                }
                ul{
                    display: none;
                    position: absolute;
                    padding:0px 20px;
                    bottom:-42px;
                    left:0px;
                    margin:0px;
                    z-index: 10;
                    background: rgba(255,255,255,0.5);
                    width:100%;
                    border-bottom-left-radius: 5px;
                    border-bottom-right-radius: 5px;
                    border:1px solid #ddd;
                    border-top:1px solid transparent;
                    li{
                        text-align: center;
                        line-height: 40px;
                        height:40px;
                        cursor: pointer;
                        &:hover{
                            color:#1890FF;
                        }
                    }
                }
                &:hover{
                    p{
                        background: rgba(255,255,255,0.3);
                    }
                    ul{
                        display: block;
                    }
                }
            }
        }
    }
</style>
<style>
    .ant-layout-sider-trigger{
        background: #E6F7FF;
        color:#1890FF;
        position: absolute;
        text-align: center;
        bottom: 50%;
        width: 15px !important;
        right: -15px;
        cursor: pointer;
        height: 80px;
        line-height: 80px;
        transform: translate(0px,40px);
    }
    .ant-layout-sider-has-trigger{
        padding-bottom: 0px;
    }
</style>