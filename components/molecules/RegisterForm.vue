<template>
  <form @submit.prevent="onSubmit()">
    <div class="fom-field">
      <BaseInput v-model="email" type="email" placeholder="E-mail" />
    </div>

    <BaseButton text="Próxima etapa" />
  </form>
</template>

<script lang="ts">
import Vue from 'vue'
import { userRegister } from '@/store'

export default Vue.extend({
  data() {
    return {
      email: ''
    }
  },
  methods: {
    async onSubmit() {
      try {
        await userRegister.create({
          email: this.email,
          redirectUrl: 'http://localhost:3000/'
        })

        this.email = ''
        this.$notify({
          type: 'success',
          text: 'Tudo certo: Olhe seu e-mail :)'
        })
      } catch {
        this.email = ''
        this.$notify({
          type: 'error',
          text: 'Algo deu errado! Tente novamente.'
        })
      }
    }
  }
})
</script>

<style lang="scss" scoped>
form {
  display: grid;
  grid-gap: 0.8rem;
  button {
    width: 100%;
  }
  a {
    justify-self: end;
    font-size: 14px;
    color: color(white);
  }
  input {
    width: 100% !important;
    padding: 0.7rem 1.2rem;
  }
}
</style>
