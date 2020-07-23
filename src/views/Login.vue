<template>
  <div id="login">
    <div id="from">
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px" class="demo-ruleForm">
        <el-form-item label="admin" prop="phone">
          <el-input v-model="ruleForm.phone" />
        </el-form-item>
        <el-form-item label="pwd" prop="password">
          <el-input v-model="ruleForm.password" type="password" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" plain @click="submitForm('ruleForm')">LOG</el-button>
          <el-button type="primary" plain @click="dialogFormVisible = true">CREATE</el-button>
        </el-form-item>
      </el-form>

      <el-dialog title="create" :visible.sync="dialogFormVisible">
        <el-form :model="userInfo">
          <el-form-item label="captcha" :label-width="formLabelWidth">
            <el-input v-model="userInfo.captcha" autocomplete="off" />
            <el-button type="primary" plain @click="getCaptcha">getCaptcha</el-button>
          </el-form-item>
          <el-form-item label="phone" :label-width="formLabelWidth">
            <el-input v-model="userInfo.phone" autocomplete="off" />
          </el-form-item>
          <el-form-item label="password" :label-width="formLabelWidth">
            <el-input v-model="userInfo.password" autocomplete="off" />
          </el-form-item>
          <el-form-item label="nickname" :label-width="formLabelWidth">
            <el-input v-model="userInfo.nickname" autocomplete="off" />
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">cancel</el-button>
          <el-button type="primary" @click="createUser">confirm</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import req from '@/utils/request.js'
export default {
  name: 'Login',
  data() {
    return {
      dialogFormVisible: false,
      formLabelWidth: '120px',
      ruleForm: {
        phone: '17600923370',
        password: '114yfzydxN'
      },
      userInfo: {
        captcha: '',
        phone: '17600923370',
        password: '',
        nickname: ''
      },
      rules: {
        phone: [
          { required: true, message: 'phone number here', trigger: 'blur' },
          { min: 11, max: 11, message: 'number wrong', trigger: 'blur' }
        ],
        password: [
          { required: true, message: 'pass here', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          req(`/login/cellphone?phone=${this.ruleForm.phone}&password=${this.ruleForm.password}`)
            .then((res) => {
              console.log(res)
              if (res.data.code === 200) {
                this.$message({
                  message: 'create success',
                  type: 'success',
                  duration: 800,
                  onClose: () => {
                    this.$store.commit('setToken', res.data.token)
                    this.$store.commit('setUser', res.data.profile)
                    this.$router.push('/player')
                  }
                })
              } else {
                this.$message({
                  message: 'Login warning',
                  type: 'warning'
                })
              }
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    getCaptcha() {
      req(`/captcha/sent?phone=${this.userInfo.phone}`)
        .then((res) => {
          console.log(res)
          if (res.data.code === 200) {
            this.$message({
              message: 'create success',
              type: 'success',
              duration: 800,
              onClose: () => {
                this.dialogFormVisible = false
              }
            })
          }
        }).catch(err => {
          throw err
        })
    },
    createUser() {
      req(`/register/cellphone?phone=${this.userInfo.phone}&password=${this.userInfo.password}&captcha=${this.userInfo.captcha}&nickname=${this.userInfo.nickname}`)
        .then(res => {
          console.log(res)
        }).catch(err => {
          throw err
        })
    }
  }
}
</script>

<style lang='less' scoped>
#login{
  width: 100%;
  height: 100%;
  display: flex;
  opacity: 0.2;
  #from{
    margin: auto;
  }
}
</style>
