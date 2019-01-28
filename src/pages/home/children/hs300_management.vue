<template>
    <div class="hs300_management">
        <div class="search">
            <a-select v-model="searchType" style="width: 120px" @change="handleChange">
                <a-select-option value="date">时间</a-select-option>
            </a-select>
            <a-input-search v-model='searchValue' placeholder="输入内容" @search="onSearch" enterButton="搜索" />
            <div class="total">
                1-20 共计{{total}}条记录
            </div>
        </div>
        <div class="table_box" v-if="columns">
            <MyTable :columns="columns" :tableData="tableData">
            </MyTable>
        </div>
    </div>
</template>

<script>
    import MyTable from '../../../components/MyTable/MyTable'
    export default {
        name: "hs300_management",
        data(){
            return {
                total:0,
                searchType:'时间',
                searchValue:'',
                tableData:[],
                columns:[],
            }
        },
        components:{
            MyTable
        },
        mounted(){
            this.getdata()
        },
        methods:{
            onSearch(){
                console.log(this.searchValue)
            },
            handleChange(){
                console.log(this.searchType)
            },
            onChange(){

            },
            getdata(){
                var arr = []
                for(var i = 0;i<1000;i++){
                    arr.push({
                        key:i,
                        date: new Date().toLocaleDateString(),
                        hs300_point:'123',
                        hs300_percent:'123',
                    })
                }
                this.tableData=arr
                this.columns=[
                    {
                        title: '交易日',
                        className:'date',
                        dataIndex: 'date',
                    },
                    {
                        title: '沪深300点位',
                        className: 'hs300_point',
                        dataIndex: 'hs300_point',
                    },
                    {
                        title: '沪深300涨幅(%)',
                        className: 'hs300_percent',
                        dataIndex: 'hs300_percent',
                    },
                ]
            }
        },
    }
</script>

<style scoped lang="less">
    .hs300_management{
        .search{
            margin-bottom: 10px;
            .ant-input-affix-wrapper{
                width:300px;
                margin-left:10px;
            }
            .total{
                float:right;
                line-height: 32px;
            }
        }
    }
</style>