import { Store } from 'vuex'
import { getModule } from 'vuex-module-decorators'

import Mobile from '@/store/mobile'
import UserRegister from '@/store/users/register'
import Auth from '@/store/auth'
import Users from '@/store/users'
import UserAvatar from '@/store/users/avatar'

// eslint-disable-next-line import/no-mutable-exports
let mobile: Mobile
let userRegister: UserRegister
let auth: Auth
let users: Users
let userAvatar: UserAvatar

const initializeStores = (store: Store<any>): void => {
  mobile = getModule(Mobile, store)
  userRegister = getModule(UserRegister, store)
  auth = getModule(Auth, store)
  users = getModule(Users, store)
  userAvatar = getModule(UserAvatar, store)
}

export { initializeStores, mobile, userRegister, auth, users, userAvatar }
