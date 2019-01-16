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
        </el-form>

        <el-table ref="multipleTable" :data="tableData3.slice((currentPage1-1)*pageSize,currentPage1*pageSize)"
                  tooltip-effect="dark" style="width: 100%"
                  @selection-change="handleSelectionChange" :show-header="true"
                  max-height="545" height="540">
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column prop="id" label="ID" width="50">
            </el-table-column>
            <el-table-column prop="nickname" label="用户名" width="170">
            </el-table-column>
            <el-table-column prop="createTime" label="时间" width="150">
            </el-table-column>
            <el-table-column prop="context" label="内容" width="550">
            </el-table-column>
            <el-table-column fixed="right" label="操作" show-overflow-tooltip>
                <template slot-scope="scope">
                    <el-button @click="handleClick(scope.row)" type="text" size="small" class="mbtn">编辑</el-button>
                </template>
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
        name: "Feedback",
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
            }
        },
        mounted() {
            // get请求地址
            this.axios.get('https://www.innothinking.cn/feedback').then((response) => {
                // console.log(response.data);
                // 数据赋值给tableData3
                this.tableData3 = response.data.feedbackLise;
                // console.log(response.data.feedbackLise);
                // this.allPageSize = parseInt(this.tableData3.length / this.pageSize + 1);
                this.allPageSize = parseInt(this.tableData3.length / this.pageSize + 1);
            }).catch((error) => {
                console.log(error);
            })
        },
        methods: {
            onSubmit() {
                this.dialogVisible = false;
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
                // this.dialogVisible = true;
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
