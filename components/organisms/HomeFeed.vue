<template>
  <div class="feed">
    <NewPostForm />

    <div class="posts">
      <PostCard v-for="post in $timelinePosts" :post="post" :key="post.id" />
    </div>
  </div>
</template>


<script lang="ts">
import Vue from 'vue'
import { timelinePosts } from '@/store'

export default Vue.extend({
  data() {
    return {
      notificationsIsOpened: false,
    }
  },
  mounted() {
    timelinePosts.index()
  },
  computed: {
    $timelinePosts() {
      return timelinePosts.$posts
    }
  },
})
</script>

<style lang="scss" scoped>
.feed {
  padding-top: 3rem;
  display: grid;
  grid-auto-rows: max-content;
  grid-gap: 1.3rem;
  justify-self: center;

  @include screen('infinity', 'large') {
    max-width: 750px;
    width: 100%;
  }

  @include screen('small') {
    width: 90%;
  }

  .posts {
    display: grid;
    grid-gap: 1.5rem;
  }
}
</style>
