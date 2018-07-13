  <template>
  <div class="login">
    <vi-card>
      <vi-card-content>

        <vi-item class="header-item" height="auto">
          <vi-item-avatar>
            <img class="logo" src="../assets/app-logo.jpg" alt="">
          </vi-item-avatar>
          <vi-item-content>
            <div class="title">School Portal</div>
            <div class="note">(for teachers only)</div>
          </vi-item-content>
        </vi-item>


        <div class="header">
          <div class="subtitle">Login to your account</div>
        </div>

          <div class="input-group">
            <vi-input-label>Username</vi-input-label>
            <vi-input v-model="username" placeholder="Enter your username" v-on:keyup.enter="submit"/>
          </div>

          <div class="input-group">
            <vi-input-label>Password</vi-input-label>
            <vi-input v-model="password" type="password" placeholder="Enter your username" v-on:keyup.enter="submit"/>
          </div>

          <vi-input-error class="mb-24" v-if="error">username / password is wrong</vi-input-error>

          <vi-button :disabled="loading" @click="submit" primary>{{loading ? 'Loggin in...' : 'Login'}}</vi-button>

        <vi-row class="notice">
          <vi-icon name="info-circular" size="32" class="no-shrink mr-20"/>
          <div>
            <p class="mb-20">We would like to draw your attention that we will gradually synchronize the reading packs in school portal with those in the App. You please stay tuned for the new reading packs which will be constantly uploaded to the school portal and the App. Thank you!</p>
            <p>請您留意：我們將會逐步把EHLA學校應用端的閱讀套件與在學生應用App裏的套件進行同步。我們會不斷地把新的閱讀套件上載到學校應用端和App，請您繼續留意，謝謝！</p>
          </div>
        </vi-row>

      </vi-card-content>
    </vi-card>
  </div>
</template>

<script>
export default {

  name: 'login',

  data () {
    return {
      username: '',
      password: '',
      error: false,
      loading: false
    }
  },

  methods: {
    async submit () {
      let loader = this.$loading.show()
      const res = await this.$store.dispatch('login', {
        username: this.username,
        password: this.password
      })
      if (res) {
        this.$router.push({
          name: 'home'
        })
      } else {
        this.error = true
      }
      loader.hide()
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import '../../../lib/stylus/main.styl'

  .login
    background-image url(../assets/home_banner.png)
    background-size cover
    position fixed
    top 0
    bottom 0
    left 0
    right 0

  .vi-toolbar-logo
    display block
    text-align center

  .logo
    width 80px
    height @width

  .input-group
    margin-bottom 16px

  .vi-card
    width 360px
    margin 80px auto
    box-shadow 2px 2px 22px 0 rgba(0,0,0,0.1)

  .vi-button
    width 100%
    margin-top 24px
    height 40px

  .header-item
    align-items flex-end

    .vi-item__avatar
      padding-right 16px

    .note
      font-size 18px
      color $mild-grey
      margin-top -2px

  .header
    margin 24px 0 24px
    text-align center

  .title
    font-size 30px
    margin-bottom 6px
    line-height 1

  .subtitle
    font-size 18px
    color #777
    font-style italic
    line-height 1

  #layout-1 > polygon, #layout-1 > path
    fill black

  .vi-toolbar-logo
    height 40px
    margin-left 0

    svg
      width auto

  .notice
    position fixed
    bottom 0
    left 0
    right 0
    padding 20px 40px
    background #a58d1c
    color white
    font-size 16px

  .no-shrink
    flex-shrink 0
</style>
