<template>
    <div>
        <el-form ref="searchForm" class="search-form"
                 :style="{width:formWidth+'px'}">
            <el-input class="search-item" v-model="userId.prop" :placeholder="'请输入'+userId.label"
                      prefix-icon="el-icon-search"
                      :style="{width:searchWidth+'px'}"></el-input>
            <el-input class="search-item" v-model="userName.prop" :placeholder="'请输入'+userName.label"
                      prefix-icon="el-icon-search"
                      :style="{width:searchWidth+'px'}"></el-input>
            <el-button class="search-button–primary" type="primary">
                搜索
            </el-button>
        </el-form>
    </div>
</template>

<script>
    export default {
        name: "UserManager",
        props: {
            userId: {
                type: Object,
                default: function () {
                    return {
                        label: '用户ID',
                        prop: ''
                    }
                }
            },
            userName: {
                type: Object,
                default: function () {
                    return {
                        label: '昵称',
                        prop: ''
                    }
                }
            }
        },
        data: function () {
            return {
                formWidth: 1600,
                searchWidth: 200,
                submitSearching: false
            }
        },
    }
</script>

<style scoped>

</style>