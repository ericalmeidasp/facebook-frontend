import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'
import { $axios } from '@/utils/nuxt-instance'
import { Post } from '@/models'

@Module({ name: 'posts/comments', stateFactory: true, namespaced: true })
export default class CommentsPosts extends VuexModule {
  private posts = [] as Post[]

  get $posts() {
    return this.posts
  }

  @Mutation
  private GETTIMELINE_POSTS(posts: Post[]) {
    this.posts = posts
  }

  @Action
  public async index() {
    const posts: Post[] = await $axios.$get('/posts')
    this.context.commit('GETTIMELINE_POSTS', posts)
  }
}