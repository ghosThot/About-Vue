<template>
  <div>
    <KForm :model="model" :rules="rules" ref="form">
      <KFormItem label="用户名" prop="username">
        <KInput v-model="model.username"></KInput>
      </KFormItem>
      <KFormItem label="密码" prop="password">
        <KInput v-model="model.password"></KInput>
      </KFormItem>
      <KFormItem>
        <button @click="login">login</button>
      </KFormItem>
    </KForm>
    {{model}}
  </div>
</template>

<script>
import KInput from '@/components/form/KInput.vue';
import KFormItem from '@/components/form/KFormItem.vue';
import KForm from '@/components/form/KForm.vue';

export default {
  data() {
    return {
      model: {
        username: '人生',
        password: 'xxxyyy'
      },
      rules: {
        username: [
          {required: true, messages: '请输入用户名'}
        ],
        password: [
          {required: true, messages: '请输入密码'}
        ],
      } 
    }
  },
  components: {
    KInput,
    KFormItem,
    KForm
  },
  methods: {
    login() {
      this.$refs.form.validate(isValid => {
        // if (isValid) {
        //   console.log('發送請求')
        // }else {
        //   alert('校驗失敗')
        // }
        this.$notice({
          title: '校驗結果',
          message: isValid ? '请求登陆' : '校验失败',
          duration: 2000
        }).show()
      })
    }
  },
}
</script>

<style lang="scss" scoped>

</style>