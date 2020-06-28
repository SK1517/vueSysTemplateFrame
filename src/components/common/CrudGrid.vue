<template>
    <div class="main-content">
        <div class="condition-wrapper" v-if="searchConditions.length">
            <div class="condition-item" v-for="(cond,index) in searchConditions" :key="index" >
                <span>{{cond.label}}：</span>
                <el-input v-if="cond.type==='input'" :placeholder="'请输入'+cond.label"
                          v-model="searchCondition[cond.prop]"></el-input>
                <el-select v-if="cond.type==='select'" :placeholder="'请选择'+cond.label"
                           v-model="searchCondition[cond.prop]">
                    <el-option
                            v-for="item in cond.options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
                <el-date-picker
                        v-if="cond.type==='date'"
                        :placeholder="'请选择'+cond.label"
                        :value-format="cond.valueFormat"
                        v-model="searchCondition[cond.prop]"
                        type="date">
                </el-date-picker>
                <el-radio-group v-if="cond.type==='radio'" v-model="searchCondition[cond.prop]">
                    <el-radio v-for="item in cond.options" :key="item.value" :label="item.value">{{item.label}}
                    </el-radio>
                </el-radio-group>
                <el-checkbox-group v-if="cond.type==='checkbox'" v-model="searchCondition[cond.prop]">
                    <el-checkbox v-for="item in cond.options" :key="item.value" :label="item.value">{{item.label}}
                    </el-checkbox>
                </el-checkbox-group>
                <el-switch
                        v-if="cond.type==='switch'"
                        v-model="searchCondition[cond.prop]"
                        active-color="#13ce66"
                        inactive-color="#ff4949">
                </el-switch>
            </div>
            <div class="condition-item">
                <el-button type="primary" :icon="searchButton.icon" @click="handleSearch" v-loading="dataLoading">{{searchButton.label || '查询'}}</el-button>
            </div>
        </div>
        <el-table
                v-loading="dataLoading"
                ref="dataTable"
                v-if="tableHeight"
                :data="tableData"
                :height="tableHeight"
                @selection-change="handleSelectionChange"
                style="width: 100%">
            <template v-for="(col,index) in tableColumns">
                <el-table-column v-if="col.type==='selection' || col.type==='index'" :key="index" :type="col.type"></el-table-column>
                <el-table-column
                        v-if="col.template"
                        :key="index"
                        show-overflow-tooltip
                        :type="col.type"
                        :sortable="col.sortable"
                        :fixed="col.fixed"
                        :prop="col.prop"
                        :label="col.label"
                        :width="col.width">
                    <template slot-scope="scope">
                        <slot v-bind:row="scope.row" :name="'slot_'+col.prop"></slot>
                    </template>
                </el-table-column>
                <el-table-column
                        v-if="!col.template && col.type!='selection' && col.type!='index'"
                        :key="index"
                        show-overflow-tooltip
                        :type="col.type"
                        :sortable="col.sortable"
                        :fixed="col.fixed"
                        :prop="col.prop"
                        :label="col.label"
                        :width="col.width"
                        :formatter="col.formatter">
                </el-table-column>
            </template>
        </el-table>
        <el-table
                v-loading="dataLoading"
                ref="dataTable"
                v-if="!tableHeight"
                :data="tableData"
                @selection-change="handleSelectionChange"
                style="width: 100%">
            <template v-for="(col,index) in tableColumns">
                <el-table-column v-if="col.type==='selection' || col.type==='index'" :key="index" :type="col.type"></el-table-column>
                <el-table-column
                        v-if="col.template"
                        :key="index"
                        show-overflow-tooltip
                        :type="col.type"
                        :sortable="col.sortable"
                        :fixed="col.fixed"
                        :prop="col.prop"
                        :label="col.label"
                        :width="col.width">
                    <template slot-scope="scope">
                        <slot v-bind:row="scope.row" :name="'slot_'+col.prop"></slot>
                    </template>
                </el-table-column>
                <el-table-column
                        v-if="!col.template && col.type!='selection' && col.type!='index'"
                        :key="index"
                        show-overflow-tooltip
                        :type="col.type"
                        :sortable="col.sortable"
                        :fixed="col.fixed"
                        :prop="col.prop"
                        :label="col.label"
                        :width="col.width"
                        :formatter="col.formatter">
                </el-table-column>
            </template>
        </el-table>
        <el-pagination
                v-if="needPagination"
                @size-change="handlePageSizeChange"
                @current-change="handlePageChange"
                :current-page="pagination.page"
                :page-sizes="[10, 20, 30, 50, 100]"
                :page-size="pagination.size"
                layout="total, sizes, prev, pager, next, jumper"
                :total="pagination.total">
        </el-pagination>
    </div>
</template>

<script>
  import axs from '../../../axios.service';
  export default {
    name: "CrudGrid",
    props: {
      conditions: {
        type: Array,
        default: function(){
          return []
        }
      },
      searchButton:{
        type:Object,
        default:function(){
          return {
            icon:'',
            label:'查询'
          }
        }
      },
      needPagination: {
        type: Boolean,
        default: true
      },
      fetchProp: {
        type: Object,
        default: function(){
          return {
            url: '',
            method: 'get',
            pageKey:'page',
            sizeKey:'size',
            totalKey:'res.total',
            statusKey: 'status',
            successCode: 200,
            dataKey: 'res.data',
          }
        }
      },
      tableHeight:{
        type:Number,
        default:0
      },
      tableColumns: {
        type: Array,
        default: function(){
          return []
        }
      }
    },
    computed:{
      searchConditions:function(){
        return this.conditions.filter(item=>{
          return item.type
        })
      }
    },
    data () {
      return {
        searchCondition: {},
        tableData: [],
        pagination: {
          page: 1,
          size: 20,
          total: 0
        },
        dataLoading:false,
      }
    },
    created () {
      this.conditions.forEach(cond => {
        if (cond.prop) {
          this.$set(this.searchCondition,cond.prop,cond.value)
        }
      })
    },
    methods: {
      handlePageSizeChange (val) {
        console.log('handlePageSizeChange', val, this.pagination.size)
        this.pagination.size = val;
        this.pagination.page = 1;
        this.getPageData();
      },
      handlePageChange (val) {
        console.log('handlePageChange', val)
        this.pagination.page = val;
        this.getPageData();
      },
      handleSelectionChange(val){
        console.log('handleSelectionChange',val)
        this.$emit('SelectionChange',val)
      },
      setSelection(attrKey,vals){
        this.$nextTick(()=>{
          vals.forEach(val=>{
            let index = this.tableData.findIndex(data=>{
              return val==data[attrKey]
            })
            if(index>-1){
              this.$refs.dataTable.toggleRowSelection(this.tableData[index],true)
            }
          })
        })
      },
      handleSearch(){
        this.pagination.page = 1;
        this.getPageData();
      },
      getPageData () {
        this.dataLoading = true;
        const params = {};
        if(this.needPagination){
          const pageKey = this.fetchProp.pageKey || 'page';
          const sizeKey = this.fetchProp.sizeKey || 'size';
          params[pageKey] = this.pagination.page;
          params[sizeKey] = this.pagination.size;
        }
        for(let condKey in this.searchCondition){
          params[condKey] = this.searchCondition[condKey];
        }
        axs.request(this.fetchProp.url,params,this.fetchProp.method).then(res=>{
            if(res[this.fetchProp.statusKey] == this.fetchProp.successCode && this.fetchProp.dataKey){
              this.tableData =  eval(`${this.fetchProp.dataKey}`);
              if(this.fetchProp.totalKey){
                this.pagination.total = eval(`${this.fetchProp.totalKey}`);
              }else{
                this.pagination.total = 1;
              }
              this.$emit('FetchedData',this.tableData)
            }else{
              this.$message.warning('获取数据失败');
              this.tableData = [];
              this.pagination.total = 1;
            }
          this.dataLoading = false;
        }).catch(e=>{
          this.$message.error('获取数据异常');
          this.tableData = [];
          this.pagination.total = 1;
          this.dataLoading = false;
          console.log(e)
        })
      },
    },
    mounted(){
      console.log('Child component mounted')
      this.getPageData()
    }
  }
</script>

<style scoped>
    .el-pagination {
        text-align: left;
        padding: 12px 15px;
    }
</style>