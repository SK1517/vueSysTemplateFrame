<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <up-left-right-layout :header-height="80" :aside-width="220">
        <template v-slot:header>
            <el-image fit="contain" :src="require('@/assets/moretv_logo.png')"></el-image>
            <div class="header-title">商品管理系统</div>
            <el-button class="el-button–primary" type="primary">
                安全退出
            </el-button>
        </template>
        <template v-slot:aside>
            <el-menu
                    router
                    :default-active="$root.currentRoutePath">
                <el-submenu index="1">
                    <template slot="title">
                        <i class="el-icon-s-tools"></i>
                        <span>系统管理</span>
                    </template>
                    <el-menu-item index="/views/UserManager"><i class="el-icon-s-comment"></i><span
                            slot="title">用户管理</span>
                    </el-menu-item>
                    <el-menu-item index="/views/GoodsManager"><i class="el-icon-picture"></i><span
                            slot="title">商品管理</span>
                    </el-menu-item>
                </el-submenu>
            </el-menu>
        </template>
    </up-left-right-layout>
</template>

<script>

    import UpLeftRightLayout from "./components/layout/UpLeftRightLayout";

    export default {
        name: "Content",
        components: {
            UpLeftRightLayout: UpLeftRightLayout,
        }
    }
</script>

<style lang="scss">
    @import "assets/template.scss";

    * {
        padding: 0;
        margin: 0;
    }

    html, body {
        width: 100%;
        height: 100%;
        font-size: 62.5%;
    }

    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        height: 100%;
    }


</style>
