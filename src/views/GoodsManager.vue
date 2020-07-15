<template>
    <div>
        <crud-grid ref="grid" :conditions="conditions" :fetchProp="fetchProp" :tableColumns="tableColumns"
                   :needPagination="needPagination">
        </crud-grid>
    </div>
</template>

<script>

    import CrudGrid from "../components/common/CrudGrid";

    export default {
        name: "GoodsManager",
        components: {
            CrudGrid,
        },
        props: {},
        data: function () {
            return {
                needPagination: true,
                conditions: [
                    {
                        type: 'input',//type支持以下取值：input，select，date，radio，checkbox，switch
                        label: '商品标题',//查询条件显示的label
                        prop: 'title',
                        value: ''
                    },
                    {
                        type: 'select',
                        label: '商品状态',
                        prop: 'status',
                        value: 0,
                        options: [//选项列表
                            {label: '全部', value: 0},
                            {label: '已上架', value: 1},
                            {label: '已下架', value: 2},
                        ]
                    },
                    {
                        type: 'date',
                        label: '开始日期',
                        prop: 'startDate',
                        valueFormat: "yyyy-MM-dd",//取值格式化
                        value: ''
                    },
                    {
                        type: 'date',
                        label: '结束日期',
                        prop: 'endDate',
                        valueFormat: "yyyy-MM-dd",//取值格式化
                        value: ''
                    },
                ],
                fetchProp: {
                    url: '',//接口请求url，相对路径，默认值：空字符串
                    method: 'get',//接口请求方式，默认值：get
                    pageKey: 'page',//分页查询时的页号key，默认值：page
                    sizeKey: 'size',//分页查询时的每页大小key，默认值：size
                    totalKey: 'res.data.total',//查询接口返回的json结果总条数对应的字段路径，res为固定引用写法，默认值：res.total
                    statusKey: 'status',//查询接口返回正确时的状态key，默认值：status
                    successCode: 200,//查询接口返回正确时的状态码，默认值：200
                    dataKey: 'res.data.list',//查询接口返回的json结果列表数据对应的字段路径，res为固定引用写法，默认值：res.data
                },
                tableHeight: 500,//如果需要将表格高度及表头固定，内容滚动，需设置正整数，设置为0则不固定，默认值：0
                tableColumns: [
                    {
                        type: 'selection',//列展示类型，支持以下取值：index（显示序号），selection（显示多选），空字符串
                    },
                    {
                        prop: 'id',//要展示的字段属性，对应接口返回的列表中对象字段key
                        label: 'ItemId',//表头title
                        width: '120',//列的宽度，不设置则自动撑开
                    },
                    {
                        prop: 'pic',
                        label: '商品主图',
                        width: '220',
                        template: true//列的展示是否使用自定义模板
                    },
                    {
                        prop: 'title',
                        label: '商品标题',
                    },
                    {
                        prop: 'price',
                        label: '商品价格',
                        width: '120',
                        sortable: true,//列是否可排序
                    },
                    {
                        prop: 'couponAmount',
                        label: '优惠券',
                        width: '120',
                        sortable: true,
                    },
                    {
                        prop: 'rate',
                        label: '佣金比例',
                        width: '120',
                        formatter: this.rateFormatter//列的展示是否使用格式化方法返回的内容
                    },
                    {
                        prop: 'opt',
                        label: '操作',
                        width: '220',
                        template: true
                    }
                ]
            }
        },
    }
</script>

<style scoped>

</style>