import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'
import { $axios } from '@/utils/nuxt-instance'
import { Comments } from '~/models'

interface StorePayload {
  content: string
  postId: number
}

@Module({ name: 'posts/comments', stateFactory: true, namespaced: true })
export default class CommentsPosts extends VuexModule {
  @Action
  public async create(payload: StorePayload) {
    const comment: Comments = await $axios.$post('/comments', payload)
    this.context.commit('posts/timelineposts/UPDATE_POST_COMMENT', comment, { root: true })
    
  }
}
