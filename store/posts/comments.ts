import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'
import { $axios } from '@/utils/nuxt-instance'
import { Comments } from '~/models'

interface StorePayload {
  content: string
  postId: number
}

interface DestroyPayload {
  commentId: number
  postId: number
}

@Module({ name: 'posts/comments', stateFactory: true, namespaced: true })
export default class CommentsPosts extends VuexModule {
  @Action
  public async create(payload: StorePayload) {
    const comment: Comments = await $axios.$post('/comments', payload)
    this.context.commit('posts/timelineposts/UPDATE_POST_COMMENT', comment, {
      root: true
    })
  }

  public async destroy(payload: DestroyPayload) {
    await $axios.$delete(`/comments/${payload.commentId}`)
    this.context.commit('posts/timelineposts/DESTROY_POST_COMMENT', payload, {
      root: true
    })
  }
}
