<template>
    <el-tabs v-model="activeName" @tab-click="handleClick" type="card">

        <el-tab-pane label="Banner主图" name="first">
            <Banner></Banner>
        </el-tab-pane>
        <el-tab-pane label="分类图片" name="second">
            <Category></Category>
        </el-tab-pane>
        <el-tab-pane label="启动页" name="third">
            <Start></Start>
        </el-tab-pane>
    </el-tabs>
</template>

<script>
    import Start from './Start/Start'
    import Banner from './Banner/Banner'
    import Category from './Category/Category'

    export default {
        name: "Photo",
        components: {
            Start,
            Banner,
            Category
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
    .el-tabs__item{
        border-radius: 100px;
    }
</style>
