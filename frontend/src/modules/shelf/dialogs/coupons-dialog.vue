<template>
  <vi-dialog class="v-dialog__content" :value="true" width="400">
    <vi-card>

      <vi-toolbar :brand="true">
        <div class="vi-toolbar__title">
          {{title}}
        </div>
      </vi-toolbar>

      <vi-card-content>
        <div class="input-group">
          <vi-input-label>Coupon type</vi-input-label>
          <vi-select darker :line="true" v-model="typeId" :options="couponTypes" option-value="id" option-name="name" placeholder="Select coupon type">
            <template slot="item" slot-scope="{item, parent}">
              <vi-item @click="parent.toggle(item)" :link="true" height="70">
                <vi-item-content>
                  <vi-item-title>{{item.name}}</vi-item-title>
                  <vi-item-subtitle>Discount percentage: <span>{{item.discountPercentage}}%</span></vi-item-subtitle>
                  <vi-item-subtitle>Commission percentage: <span>{{item.commissionPercentage}}%</span></vi-item-subtitle>
                </vi-item-content>
              </vi-item>
            </template>
          </vi-select>
        </div>

        <div class="input-group">
          <vi-input-label>Start date</vi-input-label>
          <vi-date-picker v-model="startDate" placeholder="Coupon start date"></vi-date-picker>
        </div>

        <div class="input-group">
          <vi-input-label>Expiry date</vi-input-label>
          <vi-date-picker v-model="expiryDate" placeholder="Coupon expiry date"></vi-date-picker>
        </div>

        <div class="input-group">
          <vi-input-label>Max new customers</vi-input-label>
          <vi-input darker line v-model="maxNewCustomers" placeholder="Max new customers"/>
        </div>

        <div class="input-group">
          <vi-input-label>Count</vi-input-label>
          <vi-input darker line v-model="count" placeholder="count"/>
        </div>

        <div class="input-group">
          <vi-input-label>Min total amount</vi-input-label>
          <vi-input darker line v-model="minTotalAmount" placeholder="Min total amount"/>
        </div>

        <vi-button-row class="pt-30">
          <vi-button @click="$close(false)" size="135">Cancel</vi-button>
          <vi-button @click="onSubmit" primary size="135">Create</vi-button>
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
      startDate: '',
      expiryDate: '',
      typeId: '',
      maxNewCustomers: '',
      count: '',
      minTotalAmount: ''
    }
  },

  computed: {
    couponTypes () {
      return this.$store.state.coupons.couponTypes
    }
  },

  methods: {
    onSubmit () {
      this.$close({
        startDate: this.startDate,
        expiryDate: this.expiryDate,
        typeId: this.typeId,
        maxNewCustomers: this.maxNewCustomers,
        count: this.count,
        minTotalAmount: this.minTotalAmount
      })
    }
  },

  created () {
    this.$store.dispatch('getCouponTypes')
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
