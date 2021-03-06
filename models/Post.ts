import { ReactionsTypes } from "./reactionsTypes"

export interface Comments {
  id: number
  postId?: number
  content: string
  createdAt: string
  updatedAt: string
  user?: {
    id: number
    name: string
    username: string
    avatar?: {
      url: string
    }
  }
}

export interface Post {
  id: number
  description: string
  createdAt: string
  comments: Comments[]
  user: {
    id: number
    name: string
    username: string
    avatar?: string | null
  }
  media?: string | null
  commentsCount: number
  activeReaction: ReactionsTypes | null
  reactionsCount: {
    like: number
    love: number
    haha: number
    sad: number
    angry: number
  }
}
