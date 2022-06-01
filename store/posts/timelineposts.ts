import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'
import { $axios } from '@/utils/nuxt-instance'
import { Comments, Post, ReactionsTypes } from '@/models'

interface UpdatePostReactionPayload {
  type: ReactionsTypes
  postId: number
}

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

  @Mutation
  UPDATE_POST_REACTION(reaction: UpdatePostReactionPayload) {
    const index = this.posts.findIndex(
      (element) => element.id === reaction.postId
    )
    if (!this.posts[index].activeReaction) {
      this.posts[index].activeReaction = reaction.type
      this.posts[index].reactionsCount[reaction.type]++
    } else {
      this.posts[index].reactionsCount[
        this.posts[index].activeReaction as ReactionsTypes
      ]--
      this.posts[index].activeReaction = reaction.type
      this.posts[index].reactionsCount[reaction.type]++
    }
  }

  @Mutation
  UPDATE_POST_COMMENT(comment: Comments) {
    const index = this.posts.findIndex(
      (element) => element.id === comment.postId
    )
    this.posts[index].comments.push(comment)
  }

  @Action
  public async index() {
    const posts: Post[] = await $axios.$get('/posts')
    this.context.commit('GETTIMELINE_POSTS', posts)
  }
}
