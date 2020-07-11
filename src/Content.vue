<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <div>
        <up-left-right-layout :aside-width="220" :header-height="100">
            <template v-slot:aside>选择</template>
            <template v-slot:header>查看</template>
        </up-left-right-layout>
        <left-right-layout :aside-width="300" :header-height="100">
            <template v-slot:aside>左右1</template>
            <template v-slot:header>左右</template>
        </left-right-layout>
    </div>
</template>

<script>

    import UpLeftRightLayout from './components/layout/UpLeftRightLayout';
    import LeftRightLayout from "./components/layout/LeftRightLayout";

    export default {
        name: "Content",
        components: {
            UpLeftRightLayout,
            LeftRightLayout,
        },
        data: function () {
            return {}
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
