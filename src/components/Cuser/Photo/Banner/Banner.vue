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
            <el-button type="primary" class="fr" @click="dialogVisible = true">新增Banner<i
                class="el-icon-plus el-icon--right"></i></el-button>
        </el-form>

        <el-table ref="multipleTable" :data="tableData3.slice((currentPage1-1)*pageSize,currentPage1*pageSize)"
                  tooltip-effect="dark" style="width: 100%"
                  @selection-change="handleSelectionChange" :show-header="true"
                  max-height="545" height="540">
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column prop="name" label="描述" width="200">
            </el-table-column>
            <el-table-column prop="picUrl" label="预览" width="1000">
                <template slot-scope="scope">
                    <img :src="scope.row.picUrl" alt="" style="width: 60px;height: 60px">
                </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作" show-overflow-tooltip>
                <template slot-scope="scope">
                    <el-button @click="handleClick(scope.row)" type="text" size="small" class="mbtn">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog title="提示" :visible.sync="dialogVisible" width="50%" :before-close="handleClose">
            <el-upload
                class="upload-demo"
                action="https://www.innothinking.cn/upload"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :on-success="handleSuccess"
                :file-list="fileList2"
                list-type="picture">
                <el-button size="small" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
            <span slot="footer" class="dialog-footer">
                        <el-button @click="dialogVisible = false">取 消</el-button>
                        <el-button type="primary" @click="uploading">确 定</el-button>
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
        name: "Banner",
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
                multipleSelection: [],
                //上传图片
                fileList2: [],
                currentDate: new Date(),
                bannerUrl: ''
            }
        },
        mounted() {
            // get请求地址
            this.axios.get('https://www.innothinking.cn/banner/getAll').then((response) => {
                // console.log(response.data.bannerList);
                // 数据赋值给tableData3
                this.tableData3 = response.data.bannerList;
                // this.allPageSize = parseInt(this.tableData3.length / this.pageSize + 1);
                this.allPageSize = parseInt(this.tableData3.length / this.pageSize + 1);
                console.log('123', this.tableData3);
            }).catch((error) => {
                console.log(error);
            })
        },
        methods: {
            //查询按钮
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
            //点击获取当前行
            handleClick(row) {
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    // //截取picUrl字符
                    // let picName = row.picUrl.substring(27, row.picUrl.length);
                    // console.log(picName);
                    // //创建formData
                    // let formData = new FormData();
                    // formData.append("url", picName);
                    //
                    // //删除请求
                    // this.axios.post('https://www.innothinking.cn/delete', formData).then((response) => {
                    //     console.log('111', response);
                    //     //判断是否删除成功 如果删除成功返回success继续执行后台banner列表删除
                    //     if (response.data == 'success') {
                    //         // let FormMData = new FormData();
                    //         // FormMData.append("id", row.id);
                    //         this.axios.delete('https://www.innothinking.cn/banner' + '?id=' + row.id).then((response) => {
                    //             console.log(response);
                    //         });
                    //     } else {
                    //
                    //     }
                    // });
                    this.axios.delete('https://www.innothinking.cn/banner' + '?id=' + row.id).then((response)=>{
                        console.log(response);
                        if (response.data.code == 1){
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
                    location.reload();
                    // this.$router.go(0);
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
                console.log(row);
                // this.dialogVisible = true;

            },
            //关闭模态框
            handleClose(done) {
                this.$confirm('确认关闭？')
                    .then(_ => {
                        done();
                    })
                    .catch(_ => {
                    });
            },
            //上传图片
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePreview(file) {
                console.log(file);
            },
            handleSuccess(response, file, fileList) {
                this.bannerUrl = response.url;
                console.log(this.bannerUrl);
                // console.log(fileList);
                // console.log(response);
                // console.log(file);

            },
            uploading() {
                // console.log(this.fileList2);
                // this.axios.post('https://www.innothinking.cn/banner',this.fileList2).then((response) => {
                //     console.log(response);
                // });
                let formData = new FormData();
                formData.append("picUrl", this.bannerUrl);
                this.axios.post('https://www.innothinking.cn/banner', formData).then((response) => {
                    console.log(response);
                });
                this.dialogVisible = false;
                this.$router.go(0);
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

    .time {
        font-size: 13px;
        color: #999;
    }

    .bottom {
        margin-top: 13px;
        line-height: 12px;
    }

    .button {
        padding: 0;
        float: right;
    }

    .image {
        width: 100%;
        display: block;
    }

    .clearfix:before,
    .clearfix:after {
        display: table;
        content: "";
    }

    .clearfix:after {
        clear: both
    }
</style>
