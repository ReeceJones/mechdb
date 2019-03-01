const cookieparser = process.server ? require('cookieparser') : undefined

export const actions = {

  async nuxtServerInit({ dispatch }, { req }) {
    // fetch token from cookies
    if (req.headers.cookie) {
      try {
        const parsed = cookieparser.parse(req.headers.cookie)
        await dispatch('user/tryToken', parsed.token)
      } catch (e) {}
    }
  },

}
