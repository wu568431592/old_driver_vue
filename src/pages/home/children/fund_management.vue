<template>
    <div class="fund_management">
        <div class="search">
            <a-select v-model="searchType" style="width: 120px" @change="handleChange">
                <a-select-option value="name">基金名称</a-select-option>
                <a-select-option value="id">基金代码</a-select-option>
            </a-select>
            <a-input-search v-model='searchValue' placeholder="输入内容" @search="onSearch" enterButton="搜索" />
        </div>
        <div class="title">
            <a-button type="primary" icon="plus" @click="addNew">添加基金</a-button>
            <div class="total">
                1-20 共计{{total}}条记录
            </div>
        </div>
        <div class="table_box">
            <MyTable :columns="columns" :tableData="tableData">
                <template slot="children_operation" slot-scope="props">
                    <a-button type="primary" @click="edit(props)">编辑</a-button>
                    <a-button type="primary" @click="update(props)">修改净值</a-button>
                    <a-popconfirm title="您确定要删除吗?" @confirm="confirm(props)" @cancel="cancel" okText="确定" cancelText="取消">
                        <a-button type="default">删除</a-button>
                    </a-popconfirm>
                </template>
            </MyTable>
        </div>
        <MyAlert
                :visible="visible"
                :alertData="relAlertData"
                :alertTitle="alertTitle"
                @hideAlert="hideAlert"
                @save="handleOk"
        />
    </div>
</template>

<script>
    import MyTable from '../../../components/MyTable/MyTable'
    import MyAlert from '../../../components/MyAlert/MyAlert'
    export default {
        name: "fund_management",
        data(){
            return {
                total:0,
                searchType:'基金名称',
                searchValue:'',
                columns:[],
                tableData:[],
                visible:false,
                alertTitle:'',
                relAlertData:'',
                alertData:{
                    type:'input',
                    data:[
                        {
                            title:'基金名称',
                            type:'text',
                            placeholder:'',
                            value:''
                        },
                        {
                            title:'基金代码',
                            type:'text',
                            placeholder:'',
                            value:''
                        },
                        {
                            title:'年涨幅(%)',
                            type:'text',
                            placeholder:'精确到小数点后两位',
                            value:''
                        },
                        {
                            title:'日涨幅(%)',
                            type:'text',
                            placeholder:'精确到小数点后两位',
                            value:''
                        },
                        {
                            title:'最新净值',
                            type:'text',
                            placeholder:'',
                            value:''
                        },
                        {
                            title:'基金类型',
                            type:'text',
                            placeholder:'',
                            value:''
                        },
                        {
                            title:'风险等级',
                            type:'text',
                            placeholder:'',
                            value:''
                        },
                        {
                            title:'基金公司',
                            type:'text',
                            placeholder:'',
                            value:''
                        },
                        {
                            title:'基金经理',
                            type:'text',
                            placeholder:'',
                            value:''
                        },
                        {
                            title:'最新规模',
                            type:'text',
                            placeholder:'',
                            value:''
                        },
                        {
                            title:'成立时间',
                            type:'text',
                            placeholder:'',
                            value:''
                        },{
                            title:'收费方式',
                            type:'select',
                            value:'',
                            select_list:[
                                {
                                    title:'前端收费',
                                    value:'前端收费'
                                },
                                {
                                    title:'后端收费',
                                    value:'后端收费'
                                },
                            ]
                        },
                        {
                            title:'重仓股',
                            type:'inputs',
                            input_list:[
                                {
                                    type:'text',
                                    placeholder:'输入股票名称或代码',
                                    label:'输入股票名称或代码',
                                    value:''
                                },
                                {
                                    type:'text',
                                    placeholder:'输入占比(小数点后2位)',
                                    label:'输入占比（%）(小数点后2位)',
                                    value:''
                                },
                                {
                                    type:'text',
                                    placeholder:'输入市值(万元，精确到小数点后两位)',
                                    label:'输入市值(万元，精确到小数点后两位)',
                                    value:''
                                }
                            ]
                        },
                    ]
                }
            }
        },
        components:{
            MyTable,MyAlert
        },
        mounted(){
            this.getdata()
        },
        methods:{
            addNew(){
                this.alertTitle = '添加基金'
                var obj ={}
                obj=JSON.parse(JSON.stringify(this.alertData));
                this.relAlertData = obj
                this.visible = true
            },
            hideAlert(){
                this.visible = false
            },
            handleOk(data){
                console.log(data)
            },
            confirm(props){
                console.log('delete',props)
            },
            cancel(){

            },
            edit(props){
                console.log('edit',props)
                this.alertTitle = '编辑基金'
                var obj ={}
                obj=JSON.parse(JSON.stringify(this.alertData));
                obj.data[3].disabled=true,
                obj.data[4].disabled=true,
                this.relAlertData = obj
                this.visible = true
            },
            update(props){
                console.log('update',props)
                this.alertTitle = '修改净值'
                var obj ={}
                obj=JSON.parse(JSON.stringify(this.alertData));
                obj.data[0].disabled=true,
                obj.data[1].disabled=true,
                this.relAlertData = obj
                this.visible = true
            },
            onSearch(){
                console.log(this.searchValue)
            },
            handleChange(){
                console.log(this.searchType)
            },
            onChange(){
                console.log(1)
            },
            getdata(){
                var arr = []
                for(var i = 0;i<1000;i++){
                    arr.push({
                        key:i,
                        id:i,
                        product_name:'123',
                        big:'123',
                        level:'123',
                        percent:'123',
                    })
                }
                this.tableData=arr
                this.columns=[
                    {
                        title: '编号',
                        className:'id',
                        dataIndex: 'id',
                    },
                    {
                        title: '产品名称',
                        className: 'product_name',
                        dataIndex: 'product_name',
                    },
                    {
                        title: '最大回撤',
                        className: 'big',
                        dataIndex: 'big',
                    },
                    {
                        title: '风险等级',
                        className: 'level',
                        dataIndex: 'level',
                    },
                    {
                        title: '持有基金及比例',
                        className: 'percent',
                        dataIndex: 'percent',
                    },
                    {
                        title: '操作',
                        dataIndex: 'operation',
                        scopedSlots: { customRender: 'operation' },
                    },
                ]
            }
        },
    }
</script>

<style scoped lang="less">
    .fund_management{
        .title{
            overflow: hidden;
            .total{
                float:right;
                line-height: 32px;
            }
        }
        .search{
            margin-bottom: 10px;
            .ant-input-affix-wrapper{
                width:300px;
                margin-left:10px;
            }
        }
    }
</style>