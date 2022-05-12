import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'
import { $axios, $cookies } from '@/utils/nuxt-instance'
import { User } from '@/models'

@Module({ name: 'users', stateFactory: true, namespaced: true })
export default class Users extends VuexModule {
  private user = {} as User

  public get $single() {
    return this.user
  }

  @Mutation
  private UPDATE_USER(user: User) {
    this.user = user
  }

  @Mutation
  private SET_USER_AVATAR(avatar: User['avatar']) {
    this.user.avatar = avatar
  }

  @Action
  public async show() {
    if (!$cookies.get('token')) return

    const user = await $axios.$get('/users')

    this.context.commit('UPDATE_USER', user)
  }
}
