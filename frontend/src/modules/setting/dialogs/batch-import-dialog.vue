<template>
  <vi-dialog :value="true" width="400" persistant>
    <vi-card>
      <vi-toolbar :brand="true">
        <div class="vi-toolbar__title">
          Batch import
        </div>
      </vi-toolbar>

      <vi-card-content>

        <input ref="input" type="file" accept=".xlsx, .xls, .csv" @change="onFileImport"/>

        <vi-button-row>
          <vi-button @click="$close(false)">Cancel</vi-button>
          <vi-button @click="submit" primary :disabled="!fileLoaded">Confirm</vi-button>
        </vi-button-row>
      </vi-card-content>
    </vi-card>
  </vi-dialog>
</template>

<script>
  export default {
    name: 'level-dialog',

    data () {
      return {
        fileLoaded: false
      }
    },

    methods: {
      submit () {
        this.$close(this.$refs.input.files[0])
      },
      onFileImport () {
        this.fileLoaded = true
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .vi-button-row
    margin-top 24px

  .input-group
    margin-bottom 24px
</style>
