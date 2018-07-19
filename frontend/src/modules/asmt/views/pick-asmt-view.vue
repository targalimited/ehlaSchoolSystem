<template>
  <div class="pick-item-view">

    <vi-app-bar title="Select Assignment">

      <template v-if="selectedItem" slot="overlay">

        <div class="ml-10 vi-app-bar__title">Selected: {{selectedItem.name_en}}</div>

        <vi-spacer></vi-spacer>
        <vi-button @click="goToNextStep" class="next-button">
          Next <vi-icon size="22" class="ml-12" name="arrow-right"/>
        </vi-button>
      </template>

      <div slot="append" class="requirement-box" :class="{'requirement-box--required' : !requirementValid}">
        <div style="width: 100%">
          <vi-row>
            <vi-col xs6>
              <vi-select
                v-model="selectedClass"
                :options="classOptions"
                placeholder="Select a class"
                option-value="id"
                option-name="c_name"/>
            </vi-col>
            <vi-col xs6>
              <vi-select
                @input="callGetList"
                v-model="selectedCat"
                :options="catOptions"
                placeholder="Select a category"
                option-value="cat_grouper"
                option-name="name_en"/>
            </vi-col>
          </vi-row>
          <div class="requirement-box__instr" v-if="!requirementValid">
            Please select a class and assignment type to start.
          </div>
        </div>
      </div>
    </vi-app-bar>

    <vi-data-table
      v-if="items && requirementValid"
      :headers="headers"
      :items="items"
      v-model="selectedItem"
      item-key="id"
      return-object
      :pagination.sync="pagination"
      no-header
      :item-height="135">

      <div slot="item" slot-scope="{item, toggle, checked}" class="vi-table__row">

        <vi-table-col>
          <reading-item :item="item"/>
        </vi-table-col>

        <vi-table-col>
          <vi-button color="brand" outline>Preview</vi-button>
          <vi-checkbox-boolean
            class="ml-20"
            @click.native="toggle(item)"
            :value="checked"/>
        </vi-table-col>
      </div>
    </vi-data-table>
  </div>
</template>

<script>
  export default {
    name: 'pick-item-view',

    props: {

    },

    data() {
      return {
        classOptions: null,
        pagination: {},
        selectedItem: '',
        selectedClass: '',
        selectedCat: '',
        items: [],
        headers: [
          {
            text: 'name',
            expand: true
          },
          {
            text: 'name',
            width: '140px'
          }
        ]
      }
    },

    computed: {
      catOptions () {
        if (!this.selectedClass) return null
        return this.classOptions.find(opt => opt.id === this.selectedClass).categories
      },
      requirementValid () {
        return this.selectedClass && this.selectedCat
      }
    },

    methods: {
      async callGetList () {
        const res = await this.$store.dispatch('asmt/getItemListByClassCat', {
          classId: this.selectedClass,
          catId: this.selectedCat
        })
        this.items = res.data
      },
      goToNextStep () {
        this.$router.push({
          name: 'asmt-options',
          query: {
            classId: this.selectedClass,
            itemId: this.selectedItem.id,
            itemType: this.selectedItem.item_type
          }
        })
      }
    },

    async created () {
      const res = await this.$store.dispatch('asmt/getClassCat')
      this.classOptions = res.data
    }
  }
</script>

<style lang="stylus">
  @import '../../../lib/stylus/main.styl'

  .pick-item-view
    margin-top 65px

  .requirement-box
    transition all 0.3s
    display flex
    align-items center
    height 50px
    text-align center

    &--required
      height 200px

    &__instr
      font-size 24px
      color $light-grey
      margin-top 20px

  .next-button.next-button
    font-weight bold
    font-size 19px
    height: 50px;
    width: 120px;
    background rgba(255,255,255,0.3)
    border none

    &:hover
      background rgba(255,255,255,0.4)
</style>
