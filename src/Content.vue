<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <div>
        <up-left-right-layout></up-left-right-layout>
    </div>
</template>

<script>

    import UpLeftRightLayout from './components/layout/UpLeftRightLayout';

    export default {
        name: "Content",
        components: {
            UpLeftRightLayout,
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
