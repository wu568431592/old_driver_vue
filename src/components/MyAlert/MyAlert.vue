<template>
    <div class="MyAlert">
        <a-modal
            :title="alertTitle"
            :visible="visible"
            @ok="handleOk"
            cancelText="取消"
            okText="保存"
            :centered="true"
            @cancel="handleCancel"
            :destroyOnClose="true"
            width="1000px"
            :bodyStyle="{maxHeight:'400px',overflowY:'auto',overflowX:'hidden'}"
        >
            <div class="alert_box">
                <ul v-if="alertData.type== 'input'">
                    <li v-for="(val,index) in alertData.data" :key="index">
                        <template v-if="val.type == 'text'">
                            <label v-if="val.title =='成立时间'">
                                <span>{{val.title}}：</span>
                                <template v-if="val.value.length>0">
                                    <a-date-picker
                                            style="width:700px"
                                            :value="$moment(val.value)"
                                            @change="timeChange"
                                    />
                                </template>
                                <template v-else>
                                    <a-date-picker
                                            style="width:700px"
                                            @change="timeChange"
                                    />
                                </template>
                            </label>
                            <label v-else>
                                <span>{{val.title}}：</span>
                                <a-input :disabled="val.disabled" v-model="val.value" :type="val.type"
                                         :placeholder="val.placeholder"/>
                            </label>
                        </template>
                        <template v-if="val.type == 'text-area'">
                            <label>
                                <span>{{val.title}}：</span>
                                <a-textarea @change="textAreaChange(val.value,index)" v-model="val.value"
                                            :placeholder="val.placeholder" :col="5" :row="5"/>
                                <p>{{textNum}}/150</p>
                            </label>
                        </template>
                        <template v-if="val.type == 'select_input'">
                            <label>
                                <span>{{val.title}}：</span>
                                <a-select
                                        showSearch
                                        v-model="val.select_value"
                                        placeholder="输入搜索内容"
                                        style="width: 200px"
                                        :defaultActiveFirstOption="false"
                                        notFoundContent="暂无数据"
                                >
                                    <a-select-option v-for="d in val.options" :key="d">{{d}}</a-select-option>
                                </a-select>
                                <span class="little">名称</span>
                                <a-input class="little" v-model="val.input_value" type="text"
                                         :placeholder="val.placeholder"/>
                                <span class="little">占比(%)</span>
                            </label>
                        </template>
                        <template v-if="val.type == 'select'">
                            <label>
                                <span>{{val.title}}：</span>
                                <a-select v-model="val.value" style="width: 700px">
                                    <a-select-option v-for="(val1,index1) in val.select_list" :key="index1" :value="val1.value">{{val1.title}}</a-select-option>
                                </a-select>
                            </label>
                        </template>
                        <template v-if="val.type == 'inputs'">
                            <label>
                                <span>{{val.title}}：</span>
                                <div class="input_box" v-for="(val2,index2) in val.input_list" :key="index2">
                                    <a-input style="width: 400px"  v-model="val2.value" :type="val2.type"
                                             :placeholder="val2.placeholder"/>
                                    <span>{{val2.label}}</span>
                                </div>
                            </label>
                        </template>
                    </li>
                    <li>
                        <a-button type="primary" icon="plus-circle-o" @click="newFund">新增</a-button>
                    </li>
                </ul>
                <a-table
                        v-if="alertData.type== 'table' && alertData.table_data"
                        :columns="alertData.columns"
                        :dataSource="alertData.table_data"
                        bordered
                        :pagination="pagination"
                >
                    <template v-for="(col,idx) in ['id', 'jinzhi', 'percent','hs300','hs300_percent','time']" :slot="col" slot-scope="text, record, index">
                        <div :key="idx">
                            <a-input
                                    v-if="record.editable"
                                    style="margin: -5px 0"
                                    :value="text"
                                    @change="e => handleChange(e.target.value, record.key, col)"
                            />
                            <template v-else>{{text}}</template>
                        </div>
                    </template>
                    <template slot="operation" slot-scope="text, record, index">
                        <div class='editable-row-operations'>
                            <span v-if="record.editable">
                                <a @click="() => save(record.key)">保存</a>
                            </span>
                            <span v-else>
                                <a @click="() => edit(record.key)">编辑</a>
                            </span>
                        </div>
                    </template>
                </a-table>
            </div>
        </a-modal>
    </div>
</template>

<script>
    export default {
        name: "MyAlert",
        data() {
            // this.cacheData = this.alertData.table_data.map(item => ({ ...item }))
            return {
                textNum: 0,
                textAreaIndex: -1,
                cacheData:null,
                pagination:{
                    defaultPageSize:20,
                    showQuickJumper:true,
                    hideOnSinglePage:true
                }
            }
        },
        props: ['visible', 'alertData', 'alertTitle'],
        mounted() {

        },
        updated() {
            if(this.alertData.type == 'input'){
                console.log('updated')
                var data = this.alertData.data
                for (var i = 0; i < data.length; i++) {
                    if (data[i].type == 'text-area') {
                        this.textAreaIndex = i
                        this.textNum = this.alertData.data[this.textAreaIndex].value.length
                    }
                }
            }
        },
        methods: {
            handleOk() {
                this.$emit('save', this.alertData)
            },
            handleCancel() {
                this.$emit('hideAlert')
            },
            timeChange(date,str){
                this.alertData.data[10].value= str;
                console.log(this.alertData)
            },
            newFund() {
                var data = this.alertData.data
                if(this.$route.name=='product_management'){
                    for(var i = 0; i<data.length;i++){
                        if(data[i].type == 'select_input' && (!data[i].select_value || !data[i].input_value)){
                            this.$message.error('请添加基金数据');
                            return
                        }
                    }
                    this.alertData.data.push({
                        title: '选择基金',
                        type: 'select_input',
                        options: [
                            1, 2, 3, 4, 5, 6, 7, 8
                        ],
                        placeholder: '基金占比，精确到小数点后两位',
                        select_value: '',
                        input_value: ''
                    })
                }else{
                    for(var j = 0; j<data.length;j++){
                        if(data[j].type == 'inputs'){
                            if(!data[j].input_list[0].value){
                                this.$message.error('请添加基金数据');
                                return
                            }
                        }
                    }
                    this.alertData.data.push({
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
                    })
                }
            },
            textAreaChange(val, index) {
                this.textNum = val.length;
                if (val.length >= 150) {
                    this.alertData.data[index].value = val.slice(0, 150)
                    this.$message.error('最多输入150个字');
                }
            },
            handleChange (value, key, column) {
                const newData = [...this.alertData.table_data]
                const target = newData.filter(item => key === item.key)[0]
                if (target) {
                    target[column] = value
                    this.alertData.table_data = newData
                }
            },
            edit (key) {
                const newData = [...this.alertData.table_data]
                const target = newData.filter(item => key === item.key)[0]
                if (target) {
                    target.editable = true
                    this.alertData.table_data = newData
                }
            },
            save (key) {
                const newData = [...this.alertData.table_data]
                const target = newData.filter(item => key === item.key)[0]
                if (target) {
                    delete target.editable
                    this.alertData.table_data = newData
                    this.cacheData = newData.map(item => ({ ...item }))
                }
            },
            cancel (key) {
                const newData = [...this.alertData.table_data]
                const target = newData.filter(item => key === item.key)[0]
                if (target) {
                    Object.assign(target, this.cacheData.filter(item => key === item.key)[0])
                    delete target.editable
                    this.alertData.table_data = newData
                }
            },
        }
    }
</script>

<style scoped lang="less">
    .MyAlert {

    }
</style>
<style lang="less">
    .alert_box{
        padding:0px 40px;
        ul{
            li{
                overflow: hidden;
                margin-bottom: 10px;
                position: relative;
                label{
                    overflow: hidden;
                    >span{
                        float:left;
                        width:120px;
                        line-height: 32px;
                    }
                    span.little{
                        float:none;
                        display: inline-block;
                        vertical-align: middle;
                        width:50px;
                        margin-left:10px;
                    }
                    input.little{
                        vertical-align: middle;
                        width:380px;
                    }
                    input{
                        width:700px;
                    }
                    textarea{
                        resize: none;
                        width:700px;
                        height:100px;
                    }
                    p{
                        position: absolute;
                        bottom:0px;
                        margin-bottom: 0px;
                        right:40px;
                    }
                    div.input_box{
                        margin-left:120px;
                        margin-bottom: 10px;
                        span{
                            margin-left:10px;
                        }
                    }
                }
            }
        }
    }
</style>