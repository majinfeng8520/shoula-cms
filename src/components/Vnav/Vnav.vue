<template>
    <el-row class="tac">
        <el-col :span="24">
            <el-menu default-active="1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" text-color="#aaaaaa" router>
                <el-menu-item index="1" style="padding-left: 48px" route="HelloWorld">
                    <span slot="title">首页</span>
                </el-menu-item>
                <el-menu-item index="2" style="padding-left: 48px" route="Cuser">
                    <span slot="title">C端用户</span>
                </el-menu-item>
            </el-menu>
        </el-col>
    </el-row>

</template>

<script>
    import '../../router'
    export default {
        name: "vnav",
        methods: {
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            }
        }
    }
</script>

<style scoped>
    .tac{
        text-align: left;
    }
    .el-menu{
        border-right: none;
    }
</style>
