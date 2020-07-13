<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <div>
        <up-left-right-layout :header-height="100">
            <template v-slot:header>
                <el-input v-model="search.prop"
                          :placeholder="'请输入'+search.label" prefix-icon="el-icon-search"
                          :style="{width:'500px'}"></el-input>
                <el-button class="login-btn" type="primary" @click="submitSearch('loginForm')"
                           v-loading="submitSearching">
                    搜索
                </el-button>
            </template>
        </up-left-right-layout>
    </div>
</template>

<script>

    import UpLeftRightLayout from './components/layout/UpLeftRightLayout';

    export default {
        name: "Content",
        components: {
            UpLeftRightLayout,
        },
        props: {
            search: {
                type: Object,
                default: function () {
                    return {
                        label: '搜索内容',
                        prop: 'search'
                    }
                }
            },
        },
        data: function () {
            return {
                submitSearching: false
            }
        },

        methods: {
            submitSearch(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.submitLoading = true;
                    } else {
                        return false;
                    }
                });
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
