<template>
    <div class="nav-tags" v-if="showTags">
        <div class="tags-content">
            <el-tag
                    size="medium"
                    :key="index"
                    v-for="(item,index) in tagsList"
                    closable
                    :class="{'active': isActive(item.path)}"
                    :disable-transitions="false"
                    @close="closeTags(index)">
                <router-link :to="item.path" class="tags-li-title">{{item.title}}</router-link>
            </el-tag>
        </div>
        <div class="tags-close-box">
            <!-- elementUi下拉菜单 -->
            <el-dropdown @command="handleTags">
                <el-button size="mini">
                    标签选项
                    <i class="el-icon-arrow-down el-icon--right"></i>
                </el-button>
                <el-dropdown-menu size="small" slot="dropdown">
                    <el-dropdown-item command="other">关闭其他</el-dropdown-item>
                    <el-dropdown-item command="all">关闭所有</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>

<script>
    import bus from "./bus";  // 引入通用组件传值组件
    export default {
        data() {
            return {
                tagsList: [
                    // {path: '../../router/Search', title:'Search'}
                ], // 存放所有标签
            };
        },
        methods: {
            // 当前选中标签
            isActive(path) {
                return path === this.$route.fullPath;
            },
            // 关闭单个标签
            closeTags(index) {
                const delItem = this.tagsList.splice(index, 1)[0];
                const item = this.tagsList[index]
                    ? this.tagsList[index]
                    : this.tagsList[index - 1];
                if (item) {
                    delItem.path === this.$route.fullPath && this.$router.push(item.path);
                } else {
                    this.$router.push("/");
                }
            },
            // 关闭全部标签
            closeAll() {
                this.tagsList = [];
                this.$router.push("/");
            },
            // 关闭其他标签
            closeOther() {
                const curItem = this.tagsList.filter(item => {
                    return item.path === this.$route.fullPath;
                });
                this.tagsList = curItem;
            },
            // 设置标签
            setTags(route) {
                if (route.path !== '/') {
                    const isExist = this.tagsList.some(item => {
                        return item.path === route.fullPath;
                    });
                    if (!isExist) {
                        if (this.tagsList.length >= 8) {
                            this.tagsList.shift();
                        }
                        this.tagsList.push({
                            title: route.meta.title,
                            path: route.fullPath,
                            name: route.matched[0].components.default.name
                        });
                    }
                }
                bus.$emit("tags", this.tagsList); // 组件传值
            },
            // 点击标签下拉选项(关闭其他或者关闭所有)
            handleTags(command) {
                command === "other" ? this.closeOther() : this.closeAll();
            }
        },
        computed: {
            // 大于0则显示标签组件
            showTags() {
                return this.tagsList.length > 0;
            }
        },
        watch: {
            // 当$route发生变化重新赋值
            $route(newValue) {
                this.$root.currentRoutePath = newValue.path;
                this.setTags(newValue);
            }
        },
        created() {
            this.setTags(this.$route);
        }
    };
</script>


<style>
    .nav-tags {
        position: relative;
        height: 30px;
        overflow: hidden;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .nav-tags ul {
        box-sizing: border-box;
        width: 100%;
        height: 100%;
    }

    .tags-li {
        float: left;
        margin: 3px 5px 2px 3px;
        border-radius: 3px;
        font-size: 12px;
        overflow: hidden;
        cursor: pointer;
        height: 23px;
        line-height: 23px;
        border: 1px solid #e9eaec;
        background: #fff;
        padding: 0 5px 0 12px;
        vertical-align: middle;
        color: #666;
        -webkit-transition: all 0.3s ease-in;
        -moz-transition: all 0.3s ease-in;
        transition: all 0.3s ease-in;
    }

    .tags-li:not(.active):hover {
        background: #f8f8f8;
    }

    .tags-li.active {
        color: #fff;
    }

    .tags-li-title {
        float: left;
        max-width: 80px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        margin-right: 5px;
        color: #666;
    }

    .tags-li.active .tags-li-title {
        color: #fff;
    }

    .tags-li.active {
        border: 1px solid #409EFF;
        background-color: #409EFF;
    }

    a {
        text-decoration: none;
    }

    .tags-close-box {
        position: relative;
        box-sizing: border-box;
        padding-top: 1px;
        text-align: center;
        width: 110px;
        height: 30px;
        background: #fff;
        /*box-shadow: -3px 0 15px 3px rgba(0, 0, 0, 0.1);*/
        z-index: 10;
    }

    .el-tag + .el-tag {
        margin-left: 15px;
    }
</style>
