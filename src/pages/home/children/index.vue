<template>
    <div class="index">
        yunliang <span v-if="ismorning">上午好</span><span v-else>下午好</span>，今天是{{this.time}}，欢迎使用基金定投管理系统
    </div>
</template>

<script>
    export default {
        name: "index",
        data(){
            return{
                time:'',
                ismorning:true,
            }
        },
        mounted(){
            this.getTime()
            setInterval(()=>{
                this.getTime()
            },1000)

        },
        methods:{
            getTime(){
                let date = new Date();
                const year = date.getFullYear();
                const month = date.getMonth();
                const day = date.getDate();
                const hour = date.getHours();
                const min = date.getMinutes();
                const sec = date.getSeconds();
                const week = date.getDay();
                var weekList = [
                    '一','二','三','四','五','六','日'
                ]
                if(hour>=12){
                    this.ismorning = false
                }
                const time = `${year}年${month}月${day}日 ${hour}时${min}分${sec}秒 星期${weekList[week-1]}`
                this.time = time
            }
        }

    }
</script>

<style scoped>
    .index{
        font-size: 22px;
    }
</style>