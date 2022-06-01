<template>
  <div class="post-card">
    <div class="post-card-top">
      <div class="profile-avatar">
        <img :src="post.user.avatar ? post.user.avatar.url : '/profile-pic.jpg'" alt="" />

        <div>
          <p>{{ post.user.name }}</p>
          <span>{{ new Date(post.createdAt).toLocaleString() }}</span>
        </div>
      </div>

      <div>
        <p class="post-text">
          {{ post.description }}
        </p>
      </div>
    </div>

    <div class="card-middle">
      <img v-if="post.media" :src="post.media.url" alt="" />
      <img v-else />
    </div>

    <div class="reactions-counter">
      <div class="counter-box" v-if="post.reactionsCount.like > 0">
        <img src="@/assets/img/reactions/like.svg" alt="" />
        <span>{{ post.reactionsCount.like }}</span>
      </div>

      <div class="counter-box" v-if="post.reactionsCount.love > 0">
        <img src="@/assets/img/reactions/heart.svg" alt="" />
        <span>{{ post.reactionsCount.love }}</span>
      </div>

      <div class="counter-box" v-if="post.reactionsCount.haha > 0">
        <img src="@/assets/img/reactions/laugh.svg" alt="" />
        <span>{{ post.reactionsCount.haha }}</span>
      </div>

      <div class="counter-box" v-if="post.reactionsCount.sad > 0">
        <img src="@/assets/img/reactions/sad.svg" alt="" />
        <span>{{ post.reactionsCount.sad }}</span>
      </div>

      <div class="counter-box" v-if="post.reactionsCount.angry > 0">
        <img src="@/assets/img/reactions/angry.svg" alt="" />
        <span>{{ post.reactionsCount.angry }}</span>
      </div>
    </div>

    <div class="post-actions">
      <div class="btn-reactions">
        <ul class="reactions">
          <li class="reaction-like">
            <img src="@/assets/img/reactions/like.svg" alt="" @click="updateReaction('like')" />
          </li>
          <li class="reaction-heart">
            <img src="@/assets/img/reactions/heart.svg" alt="" @click="updateReaction('love')" />
          </li>
          <li class="reaction-laugh">
            <img src="@/assets/img/reactions/laugh.svg" alt="" @click="updateReaction('haha')" />
          </li>
          <li class="reaction-sad">
            <img src="@/assets/img/reactions/sad.svg" alt="" @click="updateReaction('sad')" />
          </li>
          <li class="reaction-angry">
            <img src="@/assets/img/reactions/angry.svg" alt="" @click="updateReaction('angry')" />
          </li>
        </ul>

        <img src="@/assets/img/thumb-icon.svg" alt="" />
        <span>Reagir</span>
      </div>

      <div @click="openedComments = !openedComments" class="btn-open-comments">
        <img src="@/assets/img/comment-icon.svg" alt="" />
        <span>Comentarios</span>
      </div>
    </div>
    <div class="post-comments" :class="{ 'open-comments': openedComments }">
      <div class="comment-form">
        <form @keyup.enter="submitComment">
          <img :src="$user.avatar ? $user.avatar.url : '/profile-pic.jpg'" alt="" />
          <ExpandableTextarea v-model="text" placeholder="Escreva seu comentário" />
        </form>
      </div>

      <div class="comments">
        <div class="commments-actions">
          <button @click="howManyCommentsShow += 3">Mostrar mais</button>
          <button @click="openedComments = !openedComments; howManyCommentsShow = 3 ">
            Ocultar comentários
          </button>
        </div>
        <div class="comment" v-for="(comment, index) in post.comments" :key="comment.id"
          v-show="index >= post.comments.length - howManyCommentsShow">
          <img :src="comment.user.avatar ? comment.user.avatar.url : '/profile-pic.jpg'" alt="" />
          <div class="comment-content">
            <span>{{ comment.user.name }}</span>
            <p>
              {{ comment.content }}
            </p>
          </div>
        </div>

      </div>


    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue'
import { users, reactionsPosts, commentsPosts } from '@/store'
import { ReactionsTypes, Post, Comments } from '~/models'



export default Vue.extend({
  name: 'PostCard',
  props: {
    post: {
      type: Object,
      required: true
    } as PropOptions<Post>
  },
  data(): any {
    return {
      openedComments: false,
      text: '',
      howManyCommentsShow: 3
    }
  },
  computed: {
    $user() {
      return users.$single
    }
  },
  methods: {
    async updateReaction(type: string) {
      await reactionsPosts.update({ type, postId: this.post.id })
    },
    async submitComment() {
      const content = this.text
      this.text = ''
      await commentsPosts.create({ content, postId: this.post.id })
    }
  }
})
</script>

<style lang="scss" scoped>
.post-card {
  background: color(dark, shade1);
  border-radius: 1.25rem;
  box-shadow: 1px 3.2px 8.7px 0.3px rgba(1, 1, 1, 0.19);
  padding-bottom: 1.563rem;

  .post-card-top {
    padding: 1.2rem;
    display: grid;
    grid-gap: 1rem;

    .profile-avatar {
      display: grid;
      grid-template-columns: repeat(2, auto);
      grid-gap: 1.2rem;
      justify-content: start;
      align-items: center;

      >div {
        display: grid;
        grid-gap: 0.33rem;

        p {
          color: color(white);
          font-weight: bold;
        }

        span {
          color: color(gray, shade1);
          font-size: 0.875rem;
        }
      }

      img {
        width: 3.5rem;
        border-radius: 2.438rem;
      }
    }

    .post-text {
      color: color(white);
    }
  }

  .card-middle {
    img {
      width: 100%;
    }
  }

  .reactions-counter {
    display: grid;
    grid-auto-flow: column;
    grid-gap: 1.1rem;
    justify-content: start;
    padding-left: 1.7rem;
    position: relative;
    top: -21px;

    .counter-box {
      position: relative;
      color: #98a9bc;
      display: grid;
      align-items: center;
      justify-items: center;
      grid-gap: 0.6rem;

      img {
        width: 1.875rem;
      }
    }
  }

  .post-actions {
    display: grid;
    grid-auto-flow: column;
    grid-template-columns: repeat(2, 1fr);
    border-top: 1px solid #23354b;
    border-bottom: 1px solid #23354b;

    >div {
      cursor: pointer;
      display: grid;
      grid-auto-flow: column;
      align-items: center;
      grid-gap: 0.6rem;
      color: #f4f6f8;
      font-weight: bold;
      justify-content: center;
      padding: 1rem 0;
    }

    .btn-reactions {
      position: relative;

      .reactions {
        visibility: hidden;
        opacity: 0;
        width: auto;
        position: absolute;
        display: grid;
        grid-auto-flow: column;
        grid-gap: 0.6rem;
        top: -3.813rem;
        left: 8px;
        background: #1f354d;
        padding: 0.3rem 0.4rem;
        border-radius: 3.438rem;
        box-shadow: 1px -6px 8px rgba(0, 0, 0, 0.25);
        transition: all 300ms ease;

        @include screen('medium', 'small') {
          top: -3.188rem;
        }

        li {
          display: grid;
          align-items: center;
          position: relative;
          transform: scale(0.2);
          opacity: 0;
          transition: all 300ms;

          img {
            width: 51px;
            transition: all 300ms ease;

            @include screen('medium', 'small') {
              width: 2.5rem;
            }

            &:hover {
              transform: scale(1.15);
            }
          }
        }
      }

      &:hover .reactions {
        visibility: visible;
        opacity: 1;

        li {
          transform: scale(1);
          opacity: 1;
        }

        .reaction-heart {
          transition-delay: 0.06s;
        }

        .reaction-laugh {
          transition-delay: 0.09s;
        }

        .reaction-sad {
          transition-delay: 0.12s;
        }

        .reaction-angry {
          transition-delay: 0.15s;
        }
      }
    }
  }

  .post-comments {
    padding: 1.2rem;
    padding-bottom: 0;
    display: grid;
    grid-gap: 1.4rem;
    height: 0;
    opacity: 0;
    transition: all 300ms ease;
    overflow: hidden;

    .comment-form {
      form {
        display: grid;
        grid-template-columns: auto 1fr;
        grid-gap: 1rem;

        img {
          width: 2.688rem;
          border-radius: 50%;
        }

        .grow-wrap {
          background: #112331;
          padding: 0.888rem 1.375rem;
          border-radius: 2rem;
        }
      }
    }

    .comments {
      display: grid;
      grid-gap: 0.7rem;

      .comment {
        display: grid;
        grid-template-columns: auto 1fr;
        align-items: center;
        grid-gap: 1rem;

        .comment-content {
          display: grid;
          grid-gap: 0.5rem;
          justify-content: start;
          border-radius: 1.25rem;
          padding: 0.888rem 1.375rem;
          background: color(dark, shade2);
          color: color(white);

          span {
            font-size: 0.875rem;
            font-weight: bold;
          }
        }

        img {
          width: 2.688rem;
          border-radius: 50%;
        }
      }
    }

    .commments-actions {
      display: grid;
      grid-auto-flow: column;
      justify-content: space-between;

      button {
        outline: none;
        background: none;
        color: color(gray, shade1);
        cursor: pointer;
      }
    }
  }

  .open-comments {
    height: auto;
    opacity: 1;
  }
}
</style>
