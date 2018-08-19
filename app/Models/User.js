'use strict'

const Model = use('Model')
const Hash = use('Hash')

const Ranks = use('App/Controllers/Http/RankController')
const uuid = use('uuid/v4')

class User extends Model {

  static get hidden () {
    return ['password']
  }

  static get primaryKey () {
    return 'uuid'
  }

  static get incrementing () {
    return false
  }

  static boot () {
    super.boot()

    /**
     * A hook to hash the user password before saving
     * it to the database.
     */
    this.addHook('beforeSave', async (userInstance) => {
      if (userInstance.dirty.password) {
        userInstance.uuid = uuid()
        userInstance.password = await Hash.make(userInstance.password)
        userInstance.rank = (await Ranks.default()).id
      }
    })
  }

  /**
   * A relationship on tokens is required for auth to
   * work. Since features like `refreshTokens` or
   * `rememberToken` will be saved inside the
   * tokens table.
   *
   * @method tokens
   *
   * @return {Object}
   */
  tokens () {
    return this.hasMany('App/Models/Token')
  }
}

module.exports = User
