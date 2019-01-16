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
            <el-button type="primary" class="fr" @click="dialogVisible = true">新增启动页<i class="el-icon-plus el-icon--right"></i></el-button>
        </el-form>

        <el-table ref="multipleTable" :data="tableData3.slice((currentPage1-1)*pageSize,currentPage1*pageSize)"
                  tooltip-effect="dark" style="width: 100%"
                  @selection-change="handleSelectionChange" :show-header="true"
                  max-height="545" height="540">
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column prop="name" label="优惠券名称" width="200">
            </el-table-column>
            <el-table-column prop="createTime" label="上架时间" width="170">
            </el-table-column>
            <el-table-column prop="merchantName" label="所属商家" width="120">
            </el-table-column>
            <el-table-column prop="merchantAddress" label="商家信息" width="400">
            </el-table-column>
            <el-table-column prop="useTime" label="使用次数" width="120">
            </el-table-column>
            <el-table-column prop="deadTime" label="有效期" width="200">
            </el-table-column>
            <el-table-column fixed="right" label="操作" show-overflow-tooltip>
                <template slot-scope="scope">
                    <el-button @click="handleClick(scope.row)" type="text" size="small" class="mbtn">操作</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog title="提示" :visible.sync="dialogVisible" width="50%" :before-close="handleClose">
            <span>这是一段信息</span>
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
        name: "Start",
        data() {
            return {
                formInline: {
                    user: '',
                    region: ''
                },
                dialogVisible: false,
                pageSize: 10,    //每页数据
                currentPage1: 1,   //初始页
                allPageSize: 0,     //总页数
                tableData3: [],
                multipleSelection: []
            }
        },
        mounted() {
            // get请求地址
            this.axios.get('https://www.innothinking.cn/banner').then((response) => {
                // console.log(response.data);
                // 数据赋值给tableData3
                this.tableData3 = response.data.banner;
                // this.allPageSize = parseInt(this.tableData3.length / this.pageSize + 1);
                this.allPageSize = parseInt(this.tableData3.length / this.pageSize + 1);
                // console.log(this.tableData3);
            }).catch((error) => {
                console.log(error);
            })
        },
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
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
            },
            handleClick(row) {
                console.log(row);
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

    .fr {
        float: right;
    }
</style>
