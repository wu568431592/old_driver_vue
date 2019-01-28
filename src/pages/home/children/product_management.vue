<template>
    <div class="product_management">
        <div class="title">
            <a-button type="primary" icon="plus" @click="addNew">添加产品</a-button>
            <div class="total">
                1-20 共计{{total}}条记录
            </div>
        </div>
        <div class="table_box" v-if="columns">
            <MyTable :columns="columns" :tableData="tableData">
                <template slot="children_operation" slot-scope="props">
                    <a-button type="primary" @click="edit(props)">编辑</a-button>
                    <a-button type="primary" @click="change(props)">调仓</a-button>
                    <a-button type="primary" @click="update(props)">修改净值</a-button>
                    <a-popconfirm title="您确定要删除吗?" @confirm="confirm(props)" okText="确定" cancelText="取消">
                        <a-button type="default">删除</a-button>
                    </a-popconfirm>
                </template>
                <template slot="percent_operation" slot-scope="props">
                    <ul>
                        <li :key="index" v-for="(val,index) in props.dataInfo.percent">{{val}}</li>
                    </ul>
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
        name: "product_management",
        data(){
            return {
                total:0,
                columns:[],
                tableData:[],
                visible:false,
                textNum:0,
                alertTitle:'添加产品',
                relAlertData:'',
                alertData:{
                    type:'input',
                    data:[
                        {
                            title:'产品名称',
                            type:'text',
                            placeholder:'不超过八个字',
                            value:''
                        },
                        {
                            title:'最大回撤',
                            type:'text',
                            placeholder:'百分比，精确到小数点后两位',
                            value:''
                        },
                        {
                            title:'风险等级',
                            type:'text',
                            placeholder:'',
                            value:''
                        },
                        {
                            title:'起购金额',
                            type:'text',
                            placeholder:'精确到小数点后两位',
                            value:''
                        },
                        {
                            title:'历史年化',
                            type:'text',
                            placeholder:'精确到小数点后两位',
                            value:''
                        },
                        {
                            title:'累计净值',
                            type:'text',
                            placeholder:'精确到小数点后两位',
                            value:''
                        },
                        {
                            title:'申购费率',
                            type:'text',
                            placeholder:'精确到小数点后两位',
                            value:''
                        },
                        {
                            title:'最大赎回份额',
                            type:'text',
                            placeholder:'',
                            value:''
                        },
                        {
                            title:'最低赎回份额',
                            type:'text',
                            placeholder:'',
                            value:''
                        },
                        {
                            title:'赎回费率',
                            type:'text',
                            placeholder:'精确到小数点后两位',
                            value:''
                        },
                        {
                            title:'简短介绍',
                            type:'text',
                            placeholder:'不超过十个字',
                            value:''
                        },
                        {
                            title:'详细介绍',
                            type:'text-area',
                            placeholder:'不超过150字',
                            value:''
                        },
                        {
                            title:'选择基金',
                            type:'select_input',
                            options:[
                                1,2,3,4,5,6,7,8
                            ],
                            placeholder:'基金占比，精确到小数点后两位',
                            select_value:'',
                            input_value:''
                        },
                    ]
                },
            }
        },
        computed:{

        },
        components:{
            MyTable,MyAlert
        },
        methods:{
            confirm(props){
                console.log('delete',props)
            },
            handleOk(data){
                console.log(data)
            },
            hideAlert(){
                this.visible = false
            },
            change(props){
                console.log('change',props)
                let data = {
                    type:'input',
                    data:[]
                }
                data.data.push({
                    title:'产品名称',
                    type:'text',
                    placeholder:'不超过十个字',
                    disabled:true,
                    value:props.dataInfo.product_name
                })
                props.dataInfo.percent.forEach(function(val){
                    data.data.push({
                        title:'选择基金',
                        type:'select_input',
                        placeholder:'基金占比，精确到小数点后两位',
                        select_value:val,
                        input_value:val,
                        options:props.dataInfo.percent
                    })
                })
                this.relAlertData = data
                this.alertTitle = '调仓'
                this.visible = true
            },
            edit(props){
                console.log('edit',props)
                var obj ={}
                obj=JSON.parse(JSON.stringify(this.alertData));
                this.relAlertData = obj
                this.alertTitle = '编辑产品'
                this.visible = true
            },
            update(props){
                console.log('update',props)
                const columns = [{
                    title: '编号',
                    dataIndex: 'id',
                    width:'14%',
                }, {
                    title: '当日净值',
                    dataIndex: 'jinzhi',
                    width:'14%',
                    scopedSlots: { customRender: 'jinzhi' },
                }, {
                    title: '涨幅(%)',
                    dataIndex: 'percent',
                    width:'14%',
                    scopedSlots: { customRender: 'percent' },
                },{
                    title: '沪深300点位',
                    dataIndex: 'hs300',
                    width:'14%',
                    scopedSlots: { customRender: 'hs300' },
                },{
                    title: '沪深300涨幅(%)',
                    dataIndex: 'hs300_percent',
                    width:'14%',
                    scopedSlots: { customRender: 'hs300_percent' },
                },{
                    title: '净值时间',
                    dataIndex: 'time',
                    width:'14%',
                    scopedSlots: { customRender: 'time' },
                },{
                    title: '操作',
                    dataIndex: 'operation',
                    width:'16%',
                    scopedSlots: { customRender: 'operation' },
                }]

                const data = []
                for (let i = 0; i < 100; i++) {
                    data.push({
                        key: i.toString(),
                        id: `${i+1}`,
                        jinzhi: 32,
                        percent:'0',
                        hs300:(Math.random()*3000).toFixed(2),
                        hs300_percent:'-2.66',
                        time:'2018-10-24',
                    })
                }
                this.relAlertData={
                    type:'table',
                    columns:columns,
                    table_data:data,
                }
                this.alertTitle = '修改净值'
                this.visible = true
            },
            getdata(){
                var arr = []
                for(var i = 0;i<10;i++){
                    arr.push({
                        key:i,
                        id:i+1,
                        product_name:'123',
                        big:'123',
                        level:'123',
                        percent:[
                            1,2,3,4,5,6,7,8
                        ],
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
                        dataIndex: 'percent',
                        className:'percent',
                        width:'20%',
                        scopedSlots: { customRender: 'percent' },

                    },
                    {
                        title: '操作',
                        dataIndex: 'operation',
                        className:'operation',
                        width:'30%',
                        scopedSlots: { customRender: 'operation' },
                    },
                ]
            },
            addNew(){
                this.alertTitle = '添加产品'
                var obj ={}
                obj=JSON.parse(JSON.stringify(this.alertData));
                this.relAlertData = obj
                this.visible = true
            },
        },
        mounted(){
            this.getdata();
            //this.relAlertData = this.alertData
        },
    }
</script>

<style scoped lang="less">
    .product_management{
        .title{
            overflow: hidden;
            .total{
                float:right;
                line-height: 32px;
            }
        }
    }
</style>

