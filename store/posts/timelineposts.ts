import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'
import { $axios } from '@/utils/nuxt-instance'
import { Post, ReactionsTypes } from '@/models'

@Module({ name: 'posts/timelineposts', stateFactory: true, namespaced: true })
export default class TimelinePosts extends VuexModule {
  private posts = [] as Post[]

  get $posts() {
    return this.posts
  }

  @Mutation
  private GETTIMELINE_POSTS(posts: Post[]) {
    this.posts = posts
  }

  // @Mutation
  // UPDATE_POST(postId: Post['id'], type: Post['activeReaction']) {
  //   const index = this.posts.findIndex((element) => element.id === postId)
  // }

  @Action
  public async index() {
    const posts: Post[] = await $axios.$get('/posts')
    this.context.commit('GETTIMELINE_POSTS', posts)
  }
}
