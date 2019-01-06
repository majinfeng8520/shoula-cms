<template>
    <el-row>
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item>
                <el-input v-model="formInline.user" placeholder="搜索用户"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button @click="onSubmit">查询</el-button>
                <!--<el-button type="warning" @click="dialogVisible = true">审核</el-button>-->
                <el-dialog title="提示" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
                    <span>确认通过审核</span>
                    <span slot="footer" class="dialog-footer">
                        <el-button @click="dialogVisible = false">取 消</el-button>
                        <el-button type="primary" @click="check()">确 定</el-button>
                    </span>
                </el-dialog>
            </el-form-item>
        </el-form>
        <el-table ref="multipleTable" :data="tableData3.slice((currentPage1-1)*pageSize,currentPage1*pageSize)"
                  tooltip-effect="dark" style="width: 100%"
                  @selection-change="handleSelectionChange" :show-header="true"
                  max-height="531" height="520">
            <el-table-column type="selection" width="55">
            </el-table-column>

            <!--<el-table-column prop="headUrl" label="图片描述" width="100">-->
            <!--<template slot-scope="scope">-->
            <!--<img :src="scope.row.headUrl" alt="" style="width: 60px;height: 60px">-->
            <!--</template>-->
            <!--</el-table-column>-->
            <el-table-column prop="orderNumber" label="订单编号" width="200">
            </el-table-column>
            <el-table-column prop="createTime" label="订单时间" width="170">
            </el-table-column>
            <el-table-column prop="phoneNumber" label="联系方式" width="120">
            </el-table-column>
            <el-table-column prop="communityName" label="小区" width="100">
            </el-table-column>
            <el-table-column prop="address" label="详细地址" width="140">
            </el-table-column>
            <el-table-column prop="money" label="订单金额" width="100">
            </el-table-column>
            <el-table-column prop="parse" label="优惠券" width="100">
            </el-table-column>
            <el-table-column prop="userId" label="用户" width="100">
            </el-table-column>
            <el-table-column prop="username" label="回收人" width="100">
            </el-table-column>
            <el-table-column label="操作" width="100">
                <template slot-scope="scope">
                    <el-button @click="handleClick(scope.row)" type="text" size="small" class="mbtn" :disabled="scope.row.status !== 2">
                        审核
                    </el-button>
                </template>
            </el-table-column>
            <el-table-column prop="status" fixed="right" label="状态" show-overflow-tooltip :formatter="carry">

            </el-table-column>
        </el-table>
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
        name: "Indent",
        data() {
            return {
                formInline: {
                    user: '',
                    region: ''
                },
                //弹出框
                pageSize: 8,    //每页数据
                currentPage1: 1,   //初始页
                allPageSize: 0,     //总页数
                dialogVisible: false,
                tableData3: [],
                multipleSelection: [],
                orderNumber: ''
            }
        },
        mounted() {
            this.axios.get('https://www.innothinking.cn/order/getAll').then((response) => {

                this.tableData3 = response.data.order;
                this.allPageSize = parseInt(this.tableData3.length / this.pageSize + 1);
                console.log(this.tableData3);
            })
        },
        methods: {
            // 判断状态显示按钮
            // checkOrder(row) {
            //     if (row.status === 2) {
            //         return '<template slot-scope="scope">' +
            //             '<el-button @click="handleClick(scope.row)" type="text" size="small" class="mbtn">审核</el-button>' +
            //             '</template>'
            //     } else {
            //
            //     }
            // },
            // 判断状态显示订单进度
            carry(row, column, cellValue) {
                if (row.status == 0) {
                    return '已完成'
                } else if (row.status == 1) {
                    return '未取件'
                } else if (row.status == 2) {
                    return '已结算'
                } else if (row.status == 3) {
                    return '已取消'
                } else {
                    return '未完成'
                }
            },
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
                // console.log(row.orderNumber);
                // this.axios.put('https://www.innothinking.cn/order/auditOrder?orderNumber=' + row.orderNumber, row).then((response) => {
                //     //打印返回的修改状态
                //     console.log(response.config.data);
                // });
                this.multipleSelection = row;
                this.dialogVisible = true;
            },
            //审核
            check() {
                //修改订单状态
                // this.multipleSelection.status = 0;
                //打印修改结果
                // console.log('修改订单状态', this.multipleSelection);

                this.axios.put('https://www.innothinking.cn/order/auditOrder?orderNumber=' + this.multipleSelection.orderNumber, this.multipleSelection).then((response) => {
                    // 打印返回的修改状态
                    console.log(response);
                    if (response.data.code === 1) {
                        alert(response.data.msg);
                        this.multipleSelection.status = 0;
                    } else {
                        alert('审核未通过');
                        this.multipleSelection.status = response.config.status;
                    }
                });
                this.dialogVisible = false;

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
    .el-input__inner {
        padding: 5px 10px;
        border-radius: 0px;
        border-right: none;
    }
</style>
