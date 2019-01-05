<template>
    <el-dropdown>
  <span class="el-dropdown-link">
      <i class="el-icon-menu"></i>
  </span>
        <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>退出</el-dropdown-item>
            <!--<el-dropdown-item>狮子头</el-dropdown-item>-->
            <!--<el-dropdown-item>螺蛳粉</el-dropdown-item>-->
            <!--<el-dropdown-item disabled>双皮奶</el-dropdown-item>-->
            <!--<el-dropdown-item divided>蚵仔煎</el-dropdown-item>-->
        </el-dropdown-menu>
    </el-dropdown>
</template>

<script>
    export default {
        name: "user"
    }
</script>

<style scoped>
    i{
        padding: 7px;
        background-color: #505050;
        color: #ffffff;
    }
</style>
