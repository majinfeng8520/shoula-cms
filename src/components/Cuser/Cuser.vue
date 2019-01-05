<template>
    <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="用户" name="first">
            <User></User>
        </el-tab-pane>
        <el-tab-pane label="订单" name="second">
            <Indent></Indent>
        </el-tab-pane>
        <el-tab-pane label="优惠券" name="third">
            <Coupons></Coupons>
        </el-tab-pane>
        <el-tab-pane label="图片" name="fourth">
            <Photo></Photo>
        </el-tab-pane>
        <el-tab-pane label="用户反馈" name="fifth">
            <Feedback></Feedback>
        </el-tab-pane>
    </el-tabs>
</template>

<script>
    import User from './User/User'
    import Indent from './Indent/Indent'
    import Coupons from './Coupons/Coupons'
    import Photo from './Photo/Photo'
    import Feedback from './Feedback/Feedback'

    export default {
        name: "Cuser",
        components: {
            User,
            Indent,
            Coupons,
            Photo,
            Feedback
        },
        data() {
            return {
                activeName: 'first'
            };
        },
        methods: {
            handleClick(tab, event) {
                // console.log(tab, event);
            }
        }
    }
</script>

<style scoped>
    .el-tabs{
        height: 100%;
    }
    .el-tab-pane{
        text-align: left;
    }
</style>
