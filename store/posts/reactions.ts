import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'
import { $axios } from '@/utils/nuxt-instance'
// import { Post } from '@/models'

interface UpdatePayload {
  type: string
  postId: number
}

@Module({ name: 'posts/reactions', stateFactory: true, namespaced: true })
export default class ReactionsPosts extends VuexModule {
  @Action
  public async update(payload: UpdatePayload) {
    await $axios.$put('/reactions', payload)
  }
}
