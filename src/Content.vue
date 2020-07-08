<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <p>{{ text }} World!</p>
</template>

<script>

    export default {
        name: "Content",
        data: function () {
            return {
                text: 'Hello'
            }
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
