<template>
    <el-row>
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item>
                <el-input v-model="formInline.user" placeholder="搜索用户"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button @click="onSubmit">查询</el-button>
                <el-button type="danger">删除</el-button>
            </el-form-item>
            <el-button type="primary" class="fr" @click="onShowAddCoupons">新增优惠券<i
                class="el-icon-plus el-icon--right"></i></el-button>
        </el-form>

        <el-table ref="multipleTable" :data="tableData3.slice((currentPage1-1)*pageSize,currentPage1*pageSize)"
                  tooltip-effect="dark" style="width: 100%"
                  @selection-change="handleSelectionChange" :show-header="true"
                  max-height="545" height="540">
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column prop="name" label="所属商家" width="300">
            </el-table-column>
            <el-table-column prop="createTime" label="上架时间" width="200">
            </el-table-column>
            <!--<el-table-column prop="name" label="所属商家" width="120">-->
            <!--</el-table-column>-->
            <el-table-column prop="merchantId" label="商家信息" width="400">
            </el-table-column>
            <el-table-column prop="useTime" label="使用次数" width="120">
            </el-table-column>
            <el-table-column prop="deadTime" label="有效期" width="200">
            </el-table-column>
            <el-table-column fixed="right" label="操作" show-overflow-tooltip>
                <template slot-scope="scope">
                    <el-button @click="handleClick(scope.row)" type="text" size="small" class="mbtn">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog title="添加优惠券" :visible.sync="dialogVisible" width="50%" :before-close="handleClose">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="优惠券名称" prop="name">
                    <el-input v-model="ruleForm.name"></el-input>
                </el-form-item>
                <el-form-item label="商家" prop="region">
                    <el-select v-model="ruleForm.region.label" placeholder="请选择商家" @change="selectGet">
                        <el-option :label="item.name" :value="item.id" v-for="item in ruleForm.region"
                                   :key="item.merchantId"></el-option>
                    </el-select>
                </el-form-item>
                <!--<el-form-item label="商家信息" prop="merchantName">-->
                <!--<el-input v-model="ruleForm.merchantName"></el-input>-->
                <!--</el-form-item>-->
                <el-form-item label="优惠券额度" prop="money">
                    <el-input v-model="ruleForm.money"></el-input>
                </el-form-item>
                <el-form-item label="结束时间" required>
                    <el-col :span="11">
                        <el-form-item prop="deadTime">
                            <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.deadTime"
                                            style="width: 100%;"></el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-form-item>
                <el-form-item label="活动形式" prop="desc">
                    <el-input type="textarea" v-model="ruleForm.desc"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <div class="block" style="text-align: center;margin-top: 20px;">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                           :current-page.sync="currentPage1" :page-size="pageSize" layout="prev, pager, next, jumper"
                           :page-count="allPageSize">
            </el-pagination>
        </div>
    </el-row>

</template>

<script>
    export default {
        name: "Coupons",
        data() {
            return {
                formInline: {
                    name: ''
                },
                dialogVisible: false,
                pageSize: 10,    //每页数据
                currentPage1: 1,   //初始页
                allPageSize: 0,     //总页数
                tableData3: [],
                multipleSelection: [],
                //创建优惠券
                ruleForm: {
                    name: '',
                    // merchantName: '',
                    region: [],
                    merchantId: '',
                    money: '',
                    deadTime: '',
                    delivery: false,
                    desc: ''
                },
                rules: {
                    name: [
                        {required: true, message: '请输入优惠券名称', trigger: 'blur'}
                    ],
                    // merchantName: [
                    //     {required: true, message: '请输入商家信息', trigger: 'blur'}
                    // ],
                    region: [
                        {required: true, message: '请选择活动区域', trigger: 'change'}
                    ],
                    money: [
                        {required: true, message: '请输入优惠券额度', trigger: 'blur'},
                        {trigger: 'blur'}
                    ],
                    deadTime: [
                        {type: 'date', required: true, message: '请选择结束日期', trigger: 'change'}
                    ],
                    desc: [
                        {required: true, message: '请填写活动形式', trigger: 'blur'}
                    ]
                }
            }
        },
        mounted() {
            // get请求地址
            this.axios.get('https://www.innothinking.cn/couponTemplate/getAll').then((response) => {
                // console.log(response.data);
                // 数据赋值给tableData3
                this.tableData3 = response.data.CouponTemplate;
                // this.allPageSize = parseInt(this.tableData3.length / this.pageSize + 1);
                this.allPageSize = parseInt(this.tableData3.length / this.pageSize + 1);
                // console.log(this.tableData3);
            }).catch((error) => {
                console.log(error);
            })
        },
        methods: {
            onSubmit() {
                this.dialogVisible = false;
            },
            //打开创建优惠券模态框
            onShowAddCoupons() {
                this.axios.get('https://www.innothinking.cn/merchant').then((response) => {
                    // console.log(response);
                    // this.ruleForm.region = response.data.merchant;
                    // console.log(this.ruleForm.region)
                    this.ruleForm.region = response.data.merchant;
                    // console.log(this.ruleForm.region)
                    // for (let i = 0; i <response.data.merchant.length ; i++) {
                    //     this.ruleForm.region = response.data.merchant[i];
                    //     console.log(this.ruleForm.region)
                    // }
                });
                this.dialogVisible = true;
            },
            toggleSelection(rows) {
                if (rows) {
                    rows.forEach(row => {
                        this.$refs.multipleTable.toggleRowSelection(row);
                    });
                } else {
                    this.$refs.multipleTable.clearSelection();
                }
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
            },
            //删除优惠券
            handleClick(row) {
                console.log(row.id);
                this.axios.delete('https://www.innothinking.cn/couponTemplate/delete' + '?id=' + row.id).then((res) => {
                    // console.log(res);
                    alert('删除成功');
                })
                // this.dialogVisible = true;
            },
            //获取下拉框的值
            selectGet(vId) {
                let obj = {};
                obj = this.ruleForm.region.find((item) => {//this.ruleForm
                    return item.id === vId;//筛选出匹配数据
                });
                this.ruleForm.merchantId = obj.id;
                // console.log(obj.id);//我这边的name就是对应label的
            },
            //提交创建优惠券
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        console.log(this.ruleForm.region.id);
                        let formData = new FormData();
                        formData.append("name", this.ruleForm.name);
                        formData.append("merchantId", this.ruleForm.merchantId);
                        formData.append("money", this.ruleForm.money);
                        formData.append("deadTime", this.ruleForm.deadTime);
                        formData.append("desc", this.ruleForm.desc);
                        this.axios.post('https://www.innothinking.cn/couponTemplate/create', formData).then((response) => {
                            console.log(response);
                        });
                        this.$router.go(0);
                        console.log('submit!');
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
                this.dialogVisible = false;
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },

            handleClose(done) {
                this.$confirm('确认关闭？')
                    .then(_ => {
                        done();
                    })
                    .catch(_ => {
                    });
            }
        }
    }
</script>

<style scoped>
    .el-input {
        /*width: 50%;*/
    }

    .mbtn {
        border: 1px solid #c5c5c5;
        border-radius: 4px;
        padding: 4px 12px;
        color: #c5c5c5;
    }

    .fr {
        float: right;
    }
</style>
