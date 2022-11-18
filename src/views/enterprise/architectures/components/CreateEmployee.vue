<template>
  <el-form label-position="top" :model="createParams" :rules="rules" ref="createform">
    <el-row :gutter="20">
      <el-col :span="6">
        <el-form-item prop="user_name">
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="createParams.photo" :src="createParams.photo" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
      </el-col>
      <el-col :span="18">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item prop="user_name" label="员工姓名">
              <el-input v-model="createParams.user_name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="id_card" label="身份证号">
              <el-input v-model="createParams.id_card"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item prop="sex" label="性别">
                <el-radio-group v-model="createParams.sex">
                  <el-radio :label="0">女</el-radio>
                  <el-radio :label="1">男</el-radio>
                </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="mobile" label="手机号">
              <el-input v-model="createParams.mobile"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="12">
        <el-form-item prop="nation" label="民族">
          <el-input v-model="createParams.nation"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item prop="native_place" label="籍贯">
          <el-input v-model="createParams.native_place"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="12">
        <el-form-item prop="specialty" label="特长">
          <el-input v-model="createParams.specialty"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item prop="education" label="学历">
          <el-input v-model="createParams.education"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>

<script>
export default {
  name: 'CreateEmployeeVisible',
  props: ['architectures_id'],
  data () {
    return {
      createParams: {
        user_name: '', // 员工姓名
        id_card: '', // 身份证号
        sex: '', // 性别
        mobile: '', // 手机号
        nation: '', // 民族
        native_place: '', // 籍贯
        photo: '', // 头像
        specialty: '', // 特长
        education: '', // 学历
        architectures_id: '' // 部门id
      },
      rules: {
        user_name: [
          { required: true, message: '请输入用户名称' }
        ]
      }
    }
  },
  methods: {
    handleAvatarSuccess (res, file) {
      this.createParams.photo = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    submit () {
      console.log(this)
      return new Promise((resolve, reject) => {
        this.$refs.createform.validate((valid) => {
          if (valid) {
            this.$api.enterprise.employee.create({
              ...this.createParams,
              architectures_id: this.architectures_id
            }).then(() => {
              resolve()
            }).catch(() => {
              reject(new Error('提交失败'))
            })
          }
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.avatar-uploader {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  ::v-deep .el-upload{
    display: flex;
    justify-content: center;
    align-items: center;
    &:hover {
      border-color: #409EFF;
    }
    .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 100%;
      height: 200px;
      text-align: center;
      margin:0 auto;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}

</style>
