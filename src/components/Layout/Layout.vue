<template>
    <el-container>
        <el-header>
            <Vheader></Vheader>
        </el-header>
        <el-container>
            <el-aside width="200px">
                <Vnav></Vnav>
            </el-aside>
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
        <el-footer>
            <el-row :gutter="20">
                <el-col :span="8">
                    <div class="grid-content bg-purple mtext">
                        关于
                    </div>
                </el-col>
                <el-col :span="16">
                    <div class="grid-content bg-purple mtext tr">
                        上海昱望信息科技有限公司
                    </div>
                </el-col>
            </el-row>
        </el-footer>
    </el-container>
</template>

<script>
    import router from '../../router'
    import Vheader from '../Vheader/Vheader'
    import Vnav from '../Vnav/Vnav'
    export default {
        name: "Layout",
        router,
        components: {
            Vheader,
            Vnav
        }
    }
</script>

<style scoped>
    .el-header, .el-footer {
        color: #333;
        text-align: center;
        line-height: 60px;
    }

    .el-header {
        background-color: #000000;
    }

    .el-aside {
        background-color: #ffffff;
        color: #333;
        text-align: center;
        line-height: 200px;
    }

    .el-main {
        background-color: #f1f1f1;
        color: #333;
        text-align: center;
        padding: 10px 30px;
    }

    .el-container {
        height: 100%;
    }

    .el-container:nth-child(5) .el-aside,
    .el-container:nth-child(6) .el-aside {
        line-height: 260px;
    }

    .el-container:nth-child(7) .el-aside {
        line-height: 320px;
    }

    .tr {
        text-align: right;
    }

    .mtext {
        color: rgba(0, 0, 0, 0.53);
        letter-spacing: 2px;
        font-size: 14px;
    }

    .el-footer {
        border-top: 1px solid #d3d3d3;
        background-color: #f1f1f1;
    }
</style>
