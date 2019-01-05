<template>
    <el-row>
        <el-col :span="4" style="text-align: left">
            <div class="grid-content bg-purple">
                来收啦&nbsp&nbsp|&nbsp&nbsp后台管理平台
            </div>
        </el-col>
        <el-col :span="18">
            <div class="grid-content bg-purple bg-purple-light"></div>
        </el-col>
        <el-col :span="2">
            <div class="grid-content bg-purple">
                <Admin></Admin>
            </div>
        </el-col>
    </el-row>
</template>

<script>
    import Admin from './Admin/Admin'
    export default {
        name: "vheader",
        components: {
            Admin
        }
    }
</script>

<style scoped>
    .el-row {
        margin-bottom: 20px;
        &:last-child {
            margin-bottom: 0;
        }
    }
    .el-col {
        border-radius: 4px;
    }
    .grid-content {
        border-radius: 4px;
        min-height: 36px;
        color: rgba(255,255,255,0.53);
    }
    .row-bg {
        padding: 10px 0;
    }

</style>
