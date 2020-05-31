<template>
  <div>
    <label>{{label}}</label>
    <slot></slot>
    <p class="error" v-if="error">{{error}}</p>
  </div>
</template>

<script>
  import Schema from 'async-validator';
  export default {
    inject: ['form'],
    props: {
      label: {
        type: String,
        default: ''
      },
      prop: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        error: 'some errors'
      }
    },
    mounted () {
      this.$on('validate', () => {
        this.validate()
      })
    },
    methods: {
      validate() {
        const rules = this.form.rules[this.prop]
        const value = this.form.model[this.prop]
        const schema = new Schema({
          [this.prop]: rules
        })
        return schema.validate({
          [this.prop]: value
        }, errors => {
          if (errors) {
            this.error = errors[0].message
          }else {
            this.error = ''
          }
        })
      }
    },
  }
</script>

<style lang="scss" scoped>

</style>