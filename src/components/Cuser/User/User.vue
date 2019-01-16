<template>
    <el-row>
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item>
                <el-input v-model="formInline.user" placeholder="搜索用户"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button @click="onSubmit">查询</el-button>
                <!--<el-button type="danger">删除</el-button>-->
            </el-form-item>
        </el-form>
        <el-table ref="multipleTable" :data="tableData3.slice((currentPage1-1)*pageSize,currentPage1*pageSize)"
                  tooltip-effect="dark" style="width: 100%"
                  max-height="531" height="520">
            <!--@selection-change="handleSelectionChange" -->
            <!--:show-header="true"-->
            <!--<el-table-column type="selection" width="55">-->
            <!--</el-table-column>-->
            <el-table-column prop="headUrl" label="图片描述" width="120">
                <template slot-scope="scope">
                    <img :src="scope.row.headUrl" alt="" style="width: 60px;height: 60px">
                </template>
            </el-table-column>
            <el-table-column prop="nickname" label="昵称" sortable width="150">
            </el-table-column>
            <el-table-column prop="createTime" label="首次下单时间" sortable width="170">
            </el-table-column>
            <el-table-column prop="phoneNumber" label="联系方式" sortable width="120">
            </el-table-column>
            <el-table-column prop="address" label="联系地址" width="350">
            </el-table-column>
            <el-table-column prop="orderCount" label="订单总数" sortable width="140">
            </el-table-column>
            <el-table-column prop="orderMoney" label="收款总额" sortable width="140">
            </el-table-column>
            <el-table-column fixed="right" label="操作" show-overflow-tooltip>
                <template slot-scope="scope">
                    <el-button @click="handleClick(scope.row)" type="text" size="small" class="mbtn">历史记录</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-dialog title="" :visible.sync="dialogVisible" width="40%" :before-close="handleClose">
            <el-row :span="24" class="el-row--flex">
                <el-col :span="12">
                    <div class="grid-content">
                        <el-row :span="24" class="el-row--flex">
                            <el-col :span="8">
                                <img src="../../../assets/logo.png" alt="" height="80" width="80">
                            </el-col>
                            <el-col :span="16">
                                <p>昵称昵称昵称昵称</p>
                                <p>2018-10-10</p>
                            </el-col>
                        </el-row>
                    </div>
                </el-col>
                <el-col :span="12">
                    <div class="grid-content">
                        <el-row :span="24">
                            <p>56笔订单</p>
                            <p>收款总额：78元</p>
                        </el-row>
                    </div>
                </el-col>
            </el-row>
            <el-col :span="24" style="margin: 20px 0;">
                <div class="grid-content">
                    <p>曾用联系方式及地址：</p>
                </div>
            </el-col>
            <el-col :span="24" style="margin: 0 0 20px 0;">
                <div class="grid-content">
                    <el-row :gutter="20">
                        <el-col :span="6">
                            <div class="grid-content bg-purple">17625371161</div>
                        </el-col>
                        <el-col :span="6">
                            <div class="grid-content bg-purple">17625371161</div>
                        </el-col>
                        <el-col :span="6">
                            <div class="grid-content bg-purple">17625371161</div>
                        </el-col>
                        <el-col :span="6">
                            <div class="grid-content bg-purple">17625371161</div>
                        </el-col>
                    </el-row>
                </div>
            </el-col>
            <el-col :span="24">
                <div class="grid-content">
                    <p>地址1：华悦家园56栋7号3单元2楼</p>
                    <p>地址1：华悦家园56栋7号3单元2楼</p>
                </div>
            </el-col>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
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
        name: "User",
        data() {
            return {
                formInline: {
                    user: '',
                    region: ''
                },
                dialogVisible: false,
                pageSize: 5,    //每页数据
                currentPage1: 1,   //初始页
                allPageSize: 0,     //总页数
                tableData3: [],
                multipleSelection: []
            }
        },
        mounted() {
            // get请求地址
            this.axios.get('https://www.innothinking.cn/user/getAll').then((response) => {
                // console.log(response.data);
                // 数据赋值给tableData3
                this.tableData3 = response.data.userList;
                // this.allPageSize = parseInt(this.tableData3.length / this.pageSize + 1);
                this.allPageSize = parseInt(this.tableData3.length / this.pageSize + 1);
                // console.log(this.tableData3);
            }).catch((error) => {
                console.log(error);
            })
        },
        computed: {},
        methods: {
            onSubmit() {
                console.log('submit!');
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
                console.log(val);
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
            },
            //点击弹出模态框
            handleClick(row) {
                console.log(row.nickname);
                this.axios.get('https://www.innothinking.cn/user/searchByNickname' + '?nickname=' + row.nickname).then(res => {
                    console.log(res);
                });
                this.dialogVisible = true;
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

    .el-input__inner {
        /*width: 100%;*/
        padding: 5px 10px;
        border-radius: 0px;
        border-right: none;
    }

    .mbtn {
        border: 1px solid #c5c5c5;
        border-radius: 4px;
        padding: 4px 12px;
        color: #c5c5c5;
    }

    .el-row--flex {
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>
