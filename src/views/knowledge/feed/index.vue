<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="Feed标题 (自动获取或用户输入)" prop="title">
        <el-input
          v-model="queryParams.title"
          placeholder="请输入Feed标题 (自动获取或用户输入)"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="最后成功抓取时间">
        <el-date-picker
          v-model="daterangeLastFetchedAt"
          style="width: 240px"
          value-format="yyyy-MM-dd"
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="建议抓取间隔(分钟)" prop="workspaceIntervalMinutes">
        <el-input
          v-model="queryParams.workspaceIntervalMinutes"
          placeholder="请输入建议抓取间隔(分钟)"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="创建时间">
        <el-date-picker
          v-model="daterangeCreateTime"
          style="width: 240px"
          value-format="yyyy-MM-dd"
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['knowledge:feed:add']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['knowledge:feed:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['knowledge:feed:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['knowledge:feed:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="feedList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="Feed主键ID" align="center" prop="feedId" />
      <el-table-column label="Feed的URL地址" align="center" prop="feedUrl" />
      <el-table-column label="Feed标题 (自动获取或用户输入)" align="center" prop="title" />
      <el-table-column label="Feed关联的网站链接" align="center" prop="siteLink" />
      <el-table-column label="最后成功抓取时间" align="center" prop="lastFetchedAt" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.lastFetchedAt, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="建议抓取间隔(分钟)" align="center" prop="workspaceIntervalMinutes" />
      <el-table-column label="是否启用该源 (1=启用, 0=禁用)" align="center" prop="isEnabled" />
      <el-table-column label="创建者" align="center" prop="createBy" />
      <el-table-column label="创建时间" align="center" prop="createTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.createTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="备注" align="center" prop="remark" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['knowledge:feed:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['knowledge:feed:remove']"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    
    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改知识库-RSS Feed源信息对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="Feed的URL地址" prop="feedUrl">
          <el-input v-model="form.feedUrl" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="Feed标题 (自动获取或用户输入)" prop="title">
          <el-input v-model="form.title" placeholder="请输入Feed标题 (自动获取或用户输入)" />
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="form.remark" type="textarea" placeholder="请输入内容" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { listFeed, getFeed, delFeed, addFeed, updateFeed } from "@/api/knowledge/feed"

export default {
  name: "Feed",
  data() {
    return {
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 知识库-RSS Feed源信息表格数据
      feedList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 备注时间范围
      daterangeLastFetchedAt: [],
      // 备注时间范围
      daterangeCreateTime: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        feedUrl: null,
        title: null,
        lastFetchedAt: null,
        workspaceIntervalMinutes: null,
        isEnabled: null,
        createTime: null,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        feedUrl: [
          { required: true, message: "Feed的URL地址不能为空", trigger: "blur" }
        ],
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    /** 查询知识库-RSS Feed源信息列表 */
    getList() {
      this.loading = true
      this.queryParams.params = {}
      if (null != this.daterangeLastFetchedAt && '' != this.daterangeLastFetchedAt) {
        this.queryParams.params["beginLastFetchedAt"] = this.daterangeLastFetchedAt[0]
        this.queryParams.params["endLastFetchedAt"] = this.daterangeLastFetchedAt[1]
      }
      if (null != this.daterangeCreateTime && '' != this.daterangeCreateTime) {
        this.queryParams.params["beginCreateTime"] = this.daterangeCreateTime[0]
        this.queryParams.params["endCreateTime"] = this.daterangeCreateTime[1]
      }
      listFeed(this.queryParams).then(response => {
        this.feedList = response.rows
        this.total = response.total
        this.loading = false
      })
    },
    // 取消按钮
    cancel() {
      this.open = false
      this.reset()
    },
    // 表单重置
    reset() {
      this.form = {
        feedId: null,
        feedUrl: null,
        title: null,
        description: null,
        siteLink: null,
        lastFetchedAt: null,
        workspaceIntervalMinutes: null,
        isEnabled: null,
        createBy: null,
        createTime: null,
        updateBy: null,
        updateTime: null,
        remark: null
      }
      this.resetForm("form")
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1
      this.getList()
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.daterangeLastFetchedAt = []
      this.daterangeCreateTime = []
      this.resetForm("queryForm")
      this.handleQuery()
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.feedId)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset()
      this.open = true
      this.title = "添加知识库-RSS Feed源信息"
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset()
      const feedId = row.feedId || this.ids
      getFeed(feedId).then(response => {
        this.form = response.data
        this.open = true
        this.title = "修改知识库-RSS Feed源信息"
      })
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.feedId != null) {
            updateFeed(this.form).then(response => {
              this.$modal.msgSuccess("修改成功")
              this.open = false
              this.getList()
            })
          } else {
            addFeed(this.form).then(response => {
              this.$modal.msgSuccess("新增成功")
              this.open = false
              this.getList()
            })
          }
        }
      })
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const feedIds = row.feedId || this.ids
      this.$modal.confirm('是否确认删除知识库-RSS Feed源信息编号为"' + feedIds + '"的数据项？').then(function() {
        return delFeed(feedIds)
      }).then(() => {
        this.getList()
        this.$modal.msgSuccess("删除成功")
      }).catch(() => {})
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('knowledge/feed/export', {
        ...this.queryParams
      }, `feed_${new Date().getTime()}.xlsx`)
    }
  }
}
</script>
