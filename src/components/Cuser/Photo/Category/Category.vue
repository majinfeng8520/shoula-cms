<template>
    <el-row>
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item>
                <el-input v-model="formInline.user" placeholder="搜索用户"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button>查询</el-button>
                <el-button type="danger">删除</el-button>
            </el-form-item>
            <el-button type="primary" class="fr" @click="dialogVisible = true">新增分类<i
                class="el-icon-plus el-icon--right"></i></el-button>
        </el-form>
        <el-table ref="multipleTable" :data="tableData3.slice((currentPage1-1)*pageSize,currentPage1*pageSize)"
                  tooltip-effect="dark" style="width: 100%"
                  @selection-change="handleSelectionChange" :show-header="true"
                  max-height="531" height="520">
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column prop="picUrl" label="预览" width="120">
                <template slot-scope="scope">
                    <img :src="scope.row.picUrl" alt="" style="width: 60px;height: 60px">
                </template>
            </el-table-column>
            <el-table-column prop="name" label="名称" sortable width="150">
            </el-table-column>
            <el-table-column prop="picUrl" label="Url" width="170">
            </el-table-column>
            <el-table-column prop="phoneNumber" label="联系方式" sortable width="120">
            </el-table-column>
            <el-table-column prop="address" label="联系地址" width="350">
            </el-table-column>
            <el-table-column prop="indentTotality" label="订单总数" sortable width="140">
            </el-table-column>
            <el-table-column prop="gathering" label="收款总额" sortable width="140">
            </el-table-column>
            <el-table-column fixed="right" label="操作" show-overflow-tooltip>
                <template slot-scope="scope">
                    <el-button @click="handleClick(scope.row)" type="text" size="small" class="mbtn">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog title="提示" :visible.sync="dialogVisible" width="50%" :before-close="handleClose">
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="活动名称">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-upload
                    class="upload-demo"
                    action="https://www.innothinking.cn/upload"
                    :on-preview="handlePreview"
                    :on-remove="handleRemove"
                    :before-remove="beforeRemove"
                    :on-success="handleSuccess"
                    multiple
                    :limit="3"
                    :file-list="fileList">
                    <el-button size="small" type="primary">点击上传</el-button>
                    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                </el-upload>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">立即创建</el-button>
                    <el-button>取消</el-button>
                </el-form-item>
            </el-form>
            <!--<span slot="footer" class="dialog-footer">-->
            <!--<el-button @click="dialogVisible = false">取 消</el-button>-->
            <!--<el-button type="primary" @click="dialogVisible = false">确 定</el-button>-->
            <!--</span>-->
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
        name: "Category",
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
                multipleSelection: [],
                // form表单
                form: {
                    name: '',
                    picUrl: '',
                    delivery: false
                },
                fileList: []
            }
        },
        mounted() {
            // get请求地址
            this.axios.get('https://www.innothinking.cn/category').then((response) => {
                // console.log(response.data);
                // 数据赋值给tableData3
                this.tableData3 = response.data.categories;
                // this.allPageSize = parseInt(this.tableData3.length / this.pageSize + 1);
                this.allPageSize = parseInt(this.tableData3.length / this.pageSize + 1);
                console.log(this.tableData3);
            }).catch((error) => {
                console.log(error);
            })
        },
        computed: {},
        methods: {
            onSubmit() {
                let formData = new FormData();
                formData.append('name', this.form.name);
                formData.append('picUrl', this.picUrl);
                this.axios.post('https://www.innothinking.cn/category', formData).then((response) => {
                    console.log(response)
                });
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
                console.log(val);
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
            },
            handleClick(row) {
                console.log(row);
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.axios.delete('https://www.innothinking.cn/category' + '?id=' + row.id).then((response) => {
                        console.log(response);
                        if (response.data.code == '1') {
                            let picName = row.picUrl.substring(27, row.picUrl.length);
                            console.log(picName);

                            let formData = new FormData();
                            formData.append('url', picName);
                            this.axios.post('https://www.innothinking.cn/delete', formData).then((response) => {
                                console.log(response);
                            })
                        }
                    });

                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            handleClose(done) {
                this.$confirm('确认关闭？')
                    .then(_ => {
                        done();
                    })
                    .catch(_ => {
                    });
            },

            handleSuccess(response, file, fileList) {
                this.picUrl = response.url;
                console.log('111', this.picUrl);
            },
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePreview(file) {
                console.log(file);
            },
            beforeRemove(file, fileList) {
                return this.$confirm(`确定移除 ${ file.name }？`);
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
</style>
