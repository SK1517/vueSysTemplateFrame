<template>
    <el-container class="m-layout-container">
        <el-header class="m-layout-header" :style="{height:headerHeight+'px'}">
            <slot name="header"></slot>
        </el-header>
        <el-main class="m-layout-main">
            <tabs v-if="needNavTab"></tabs>
            <keep-alive :include="tagsList" v-if="needNavTab">
                <router-view></router-view>
            </keep-alive>
            <router-view v-else></router-view>
        </el-main>
    </el-container>
</template>

<script>
    import config from '../../config'
    import Tabs from '../navTabs/Tags'
    import bus from '../navTabs/bus'

    export default {
        name: "UpDownLayout",
        props: {
            asideWidth: {
                type: Number,
                default: 240
            },
            headerHeight: {
                type: Number,
                default: 60
            },
        },
        components: {
            tabs: Tabs
        },
        data() {
            return {
                tagsList: [
                    // {path: '../../router/Search', title:'Search'}
                ],
                needNavTab: false,
            }
        },
        created() {
            this.needNavTab = !!config.needNavTab;
            if (this.needNavTab) {
                bus.$on('tags', msg => {
                    let arr = []
                    for (let i = 0, len = msg.length; i < len; i++) {
                        msg[i].name && arr.push(msg[i].name)
                    }
                    this.tagsList = arr
                })
            }
        },
    }
</script>

<style scoped>

    .m-layout-header {
        position: relative;
        background: #00000000;
        color: #fff;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

</style>