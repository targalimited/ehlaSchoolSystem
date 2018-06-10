<template>
  <vi-dialog :value="true" width="400">
    <vi-card>

      <vi-toolbar :brand="true">
        <div class="vi-toolbar__title">
          Assign coupon to contributor
        </div>
      </vi-toolbar>

      <vi-card-content v-if="unassignedCoupons">
        <div class="input-group">
          <vi-input-label>Coupon</vi-input-label>
          <!-- TODO use other UI i.e. table ? -->
          <vi-select darker :line="true" v-model="couponId" :options="unassignedCoupons" option-value="id" option-name="code" placeholder="Select coupon">
            <!--<template slot="item" slot-scope="{item, parent}">-->
              <!--<vi-item @click="parent.toggle(item)" :link="true" height="70">-->
                <!--<vi-item-content>-->
                  <!--<vi-item-title>{{item.name}}</vi-item-title>-->
                  <!--<vi-item-subtitle>Discount percentage: <span>{{item.discountPercentage}}%</span></vi-item-subtitle>-->
                  <!--<vi-item-subtitle>Commission percentage: <span>{{item.commissionPercentage}}%</span></vi-item-subtitle>-->
                <!--</vi-item-content>-->
              <!--</vi-item>-->
            <!--</template>-->
          </vi-select>
        </div>

        <vi-button-row class="pt-30">
          <vi-button @click="$close(false)" size="135">Cancel</vi-button>
          <vi-button @click="onSubmit" primary size="135">Assign</vi-button>
        </vi-button-row>
      </vi-card-content>
    </vi-card>
  </vi-dialog>
</template>

<script>
  export default {
    name: 'sales-profile-dialog',

    props: ['title'],

    data () {
      return {
        couponId: ''
      }
    },

    computed: {
      unassignedCoupons () {
        return this.$store.getters.unassignedCoupons
      }
    },

    methods: {
      onSubmit () {
        this.$close(this.couponId)
      }
    },

    created () {
      // TODO use cache?
      this.$store.dispatch('getCoupons')
    }
  }
</script>

<style lang="stylus" scoped>
  .vi-button-row
    margin-top 24px

  .vi-menu
    display block !important

  .input-group
    margin-bottom 24px

  .vi-item__sub-title
    font-size 12px

    span
      color #039be5
</style>
