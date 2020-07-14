<template>
    <div>
        <up-left-right-layout :header-height="100" :aside-width="formWidth">
            <template v-slot:header>
<!--                <el-image fit="contain" :src="require('@/assets/moretv_logo.png')"></el-image>-->
<!--                <el-form :model="btnForm" :rules="rules" ref="btnForm" class="btn1-form"-->
<!--                         :style="{width:formWidth+'px'}">-->
<!--                    <el-button class=" el-button–primary" type="primary" @click="submitSearch('searchForm')"-->
<!--                               v-loading="submitSearching">-->
<!--                        用户管理-->
<!--                    </el-button>-->
<!--                    <el-button class="el-button–primary" type="primary" @click="submitSearch('searchForm')"-->
<!--                               v-loading="submitSearching">-->
<!--                        内容管理-->
<!--                    </el-button>-->
<!--                    <el-button class="el-button–primary" type="primary" @click="submitSearch('searchForm')"-->
<!--                               v-loading="submitSearching">-->
<!--                        举报内容管理-->
<!--                    </el-button>-->
<!--                    <el-button class="el-button–primary" type="primary" @click="submitSearch('searchForm')"-->
<!--                               v-loading="submitSearching">-->
<!--                        意见反馈管理-->
<!--                    </el-button>-->
<!--                    <el-button class="el-button–primary" type="primary" @click="submitSearch('searchForm')"-->
<!--                               v-loading="submitSearching">-->
<!--                        上传日志管理-->
<!--                    </el-button>-->
<!--                    <el-button class="el-button–primary" type="primary" @click="submitSearch('searchForm')"-->
<!--                               v-loading="submitSearching">-->
<!--                        节目汇总管理-->
<!--                    </el-button>-->
<!--                    <el-button class="el-button–primary" type="primary" @click="submitSearch('searchForm')"-->
<!--                               v-loading="submitSearching">-->
<!--                        内测招募管理-->
<!--                    </el-button>-->
<!--                    <el-button class="el-button–primary" type="primary" @click="submitSearch('searchForm')"-->
<!--                               v-loading="submitSearching">-->
<!--                        小鹰直播意见反馈-->
<!--                    </el-button>-->
<!--                    <el-button class="el-button–primary" type="primary" @click="submitSearch('searchForm')"-->
<!--                               v-loading="submitSearching">-->
<!--                        小鹰上传日志管理-->
<!--                    </el-button>-->
<!--                </el-form>-->
<!--                <el-button class="el-button–primary" type="primary" @click="submitSearch('searchForm')"-->
<!--                           v-loading="submitSearching">-->
<!--                    安全退出-->
<!--                </el-button>-->
            </template>
        </up-left-right-layout>

        <up-down-layout :header-height="130">
<!--            <template v-slot:header>-->
<!--                <el-form :model="searchForm" :rules="rules" ref="searchForm" class="search-form"-->
<!--                         :style="{width:formWidth+'px'}">-->
<!--                    <el-input class="search-item" v-model="searchsid.prop" :placeholder="'请输入'+searchsid.label"-->
<!--                              prefix-icon="el-icon-search"-->
<!--                              :style="{width:searchWidth+'px'}"></el-input>-->
<!--                    <el-input class="search-item" v-model="searchmac.prop" :placeholder="'请输入'+searchmac.label"-->
<!--                              prefix-icon="el-icon-search"-->
<!--                              :style="{width:searchWidth+'px'}"></el-input>-->
<!--                    <el-input class="search-item" v-model="searchversion.prop" :placeholder="'请输入'+searchversion.label"-->
<!--                              prefix-icon="el-icon-search"-->
<!--                              :style="{width:searchWidth+'px'}"></el-input>-->
<!--                </el-form>-->
<!--            </template>-->
        </up-down-layout>
    </div>
</template>

<script>
    import UpLeftRightLayout from "../components/layout/UpLeftRightLayout";
    import UpDownLayout from "../components/layout/UpDownLayout";

    export default {
        name: "Search",
        components: {
            UpLeftRightLayout,
            UpDownLayout,
        },
        props: {
            searchsid: {
                type: Object,
                default: function () {
                    return {
                        label: '节目sid...',
                        prop: ''
                    }
                }
            },
            searchmac: {
                type: Object,
                default: function () {
                    return {
                        label: 'mac...',
                        prop: ''
                    }
                }
            },
            searchversion: {
                type: Object,
                default: function () {
                    return {
                        label: '版本号',
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

<style scoped>

    .btn1-form {
        position: relative;
        height: 100%;
        margin-left: 10px;
        background: #00000000;
        border-color: #00000000;
        border-radius: 3px;
    }

    .search-form {
        position: relative;
        float: left;
        height: 100%;
        background: #00000000 !important;
        border-width: 3px !important;
        border-radius: 3px !important;
        display: flex;
        align-items: center;
    }

    .search-item {
        margin-right: 40px;
        float: left;
    }

</style>