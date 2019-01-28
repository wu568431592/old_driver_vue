<template>
    <div class="MyTable">
        <a-table bordered :columns="columns" :dataSource="tableData" :pagination="pagination" @change="onChange">
            <template slot="operation" slot-scope="text, record">
                <slot name="children_operation" :data-info="record"></slot>
            </template>
            <template slot="percent" slot-scope="text, record">
                <slot name="percent_operation" :data-info="record"></slot>
            </template>
        </a-table>
    </div>
</template>

<script>

    export default {
        name: "MyTable",
        data(){
            return {
                pagination:{
                    defaultPageSize:20,
                    showQuickJumper:true,
                    hideOnSinglePage:true
                }
            }
        },
        props:['columns','tableData'],
        methods:{
            onChange(){
                console.log(123)
            }
        }
    }
</script>

<style scoped lang="less">
    .MyTable{
        padding-top:10px;
        td{
            button{
                margin:0px 10px;
            }
        }
    }
</style>
<style>
    .ant-table-thead > tr > th, .ant-table-thead > tr{
        background-color: #f1f1f1;
    }
    .ant-table-thead > tr > th, .ant-table-tbody > tr > td{
        padding:10px 16px;
    }
    .ant-table-thead > tr > th, .ant-table-tbody > tr > td button{
        margin:0px 10px;
    }
    .ant-table-thead > tr > th, .ant-table-tbody > tr > td ul{
        margin-bottom: 0px;
    }
</style>