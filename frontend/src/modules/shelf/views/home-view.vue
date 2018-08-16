<template lang="pug">
  .home-view
    .home-view__header
      h2 Hi, {{$store.getters.username}} from School {{$store.getters.schoolName}}
      p Let's get started!
    vi-row.board-section
      vi-col(xs6 md3 v-for="(link,i) in links" :key="i")
        router-link.home-view__board(:to="link.route" tag="div")
          vi-icon(:name="link.icon" size="46" color="brand")
          h3 {{link.name}}
          p {{link.content}}
    vi-row(wrap).section
      vi-col(v-for="(resource, i) in resources" :key="i" xs6 md3)
        a.home-view__pdf(:href="school_level === 'P' ? resource.source.primary : resource.source.secondary")
          img(:src="school_level === 'P' ? resource.cover.primary : resource.cover.secondary")
          ul
            li {{resource.name_l1}}
            li {{resource.name_l2}}
            li {{resource.name_l3}}
            li {{resource.name_l4}}
</template>

<script>
export default {
  name: 'home',

  data () {
    return {
      school_level: this.$store.getters.eduLv,
      resources: [
        {
          name_l1: "Pilot 100 programme",
          cover: {
            primary: "https://s3-ap-southeast-1.amazonaws.com/ehla-media-bucket/aSchool/pdf_cover/p100_primay.jpeg",
            secondary: "https://s3-ap-southeast-1.amazonaws.com/ehla-media-bucket/aSchool/pdf_cover/p100_secondary.jpeg",
          },
          source: {
             primary: "https://s3-ap-southeast-1.amazonaws.com/ehla-media-bucket/aSchool/pdf/Pilot+Scheme_primary.pdf",
             secondary: "https://s3-ap-southeast-1.amazonaws.com/ehla-media-bucket/aSchool/pdf/Pilot+programme_secondary.pdf",
          }
        },
        {
          name_l1: "Reading Comprehension Diagnosis & Teaching Section",
          name_l2: "for Primary Schools",
          name_l3: "Skill Based and EDB Curriculum Driven",
          cover: {
            primary: "https://s3-ap-southeast-1.amazonaws.com/ehla-media-bucket/aSchool/pdf_cover/pdf3-comprehension-primary.png",
            secondary: "https://s3-ap-southeast-1.amazonaws.com/ehla-media-bucket/aSchool/pdf_cover/pdf3-comprehension-primary.png",
          },
          source: {
             primary: "https://s3-ap-southeast-1.amazonaws.com/ehla-media-bucket/aSchool/pdf/Comprehension(primary).pdf",
             secondary: "https://s3-ap-southeast-1.amazonaws.com/ehla-media-bucket/aSchool/pdf/Comprehension(primary).pdf",
          }
        },
        {
          name_l1: "Reading Comprehension Diagnosis & Teaching Section",
          name_l2: "for Secondary Schools (Junior Section)",
          name_l3: "Skill Based and HKDSE Driven Question Design",
          cover: {
            primary: "https://s3-ap-southeast-1.amazonaws.com/ehla-media-bucket/aSchool/pdf_cover/pdf3-comprehension-secondary.png",
            secondary: "https://s3-ap-southeast-1.amazonaws.com/ehla-media-bucket/aSchool/pdf_cover/pdf3-comprehension-secondary.png",
          },
          source: {
             primary: "https://s3-ap-southeast-1.amazonaws.com/ehla-media-bucket/aSchool/pdf/Comprehension(secondary).pdf",
             secondary: "https://s3-ap-southeast-1.amazonaws.com/ehla-media-bucket/aSchool/pdf/Comprehension(secondary).pdf",
          }
        },
        {
          name_l1: "Literature in English Learning Programme",
          name_l2: "'Is Literature in English Difficult to learn?'",
          name_l3: "'No, it should not be.'",
          name_l4: "At EHLA, we aspire to make learning literature easy with our i-Education Ecosystem and innovative solutions",
          name: "Eng Lit",
          cover: {
            primary: "https://s3-ap-southeast-1.amazonaws.com/ehla-media-bucket/aSchool/pdf_cover/pdf2-literature-primary.png",
            secondary: "https://s3-ap-southeast-1.amazonaws.com/ehla-media-bucket/aSchool/pdf_cover/pdf2-literature-secondary.png",
          },
          source: {
             primary: "https://s3-ap-southeast-1.amazonaws.com/ehla-media-bucket/aSchool/pdf/Eng+Lit.pdf",
             secondary: "https://s3-ap-southeast-1.amazonaws.com/ehla-media-bucket/aSchool/pdf/Eng+Lit.pdf",
          }
        },
        {
          name_l1: "Intelligent Diagnosis & Teaching System",
          name_l2: "Groundbreaking‧Powerful",
          cover: {
            primary: "https://s3-ap-southeast-1.amazonaws.com/ehla-media-bucket/aSchool/pdf_cover/pdf3-comprehension-Intelligent.png",
            secondary: "https://s3-ap-southeast-1.amazonaws.com/ehla-media-bucket/aSchool/pdf_cover/pdf3-comprehension-Intelligent.png",
          },
          source: {
             primary: "https://s3-ap-southeast-1.amazonaws.com/ehla-media-bucket/aSchool/pdf/Intelligent+Diagnosis.pdf",
             secondary: "https://s3-ap-southeast-1.amazonaws.com/ehla-media-bucket/aSchool/pdf/Intelligent+Diagnosis.pdf",
          }
        },
        {
          name_l1: "Unparalleled Solutions to Student Reading",
          cover: {
            primary: "https://s3-ap-southeast-1.amazonaws.com/ehla-media-bucket/aSchool/pdf_cover/pdf1-solution+reading.png",
            secondary: "https://s3-ap-southeast-1.amazonaws.com/ehla-media-bucket/aSchool/pdf_cover/pdf1-solution+reading.png",
          },
          source: {
             primary: "https://s3-ap-southeast-1.amazonaws.com/ehla-media-bucket/aSchool/pdf/Reading+section.pdf",
             secondary: "https://s3-ap-southeast-1.amazonaws.com/ehla-media-bucket/aSchool/pdf/Reading+section.pdf",
          }
        }
      ]
    }
  },

  computed: {
    summary () {
      return this.$store.state.shelf.summary
    },
    readingCategories () {
      return this.$store.getters['shelf/categories']
    },
    selectedCount () {
      return this.$store.getters['shelf/selectedCount']
    },
    links () {
      return [
        {
          icon: 'pilot',
          name: 'Pilot',
          content: 'Browse and select the item',
          route: {
            name: 'browse-pilot-root'
          }
        },
        {
          icon: 'shelf',
          name: 'Manage',
          content: 'Manage the selected item',
          route: {
            name: 'library-unassigned'
          }
        },
        {
          icon: 'assignment',
          name: 'Assign',
          content: 'Assign and track the progress of the assignment',
          route: {
            name: 'asmt-class-progress',
            params: {
              classId: this.$store.getters.defaultClassId
            }
          }
        },
        {
          icon: 'report',
          name: 'Report',
          content: 'Get insight of the students performance from our report',
          route: {
            name: 'report-class-weakness',
            params: {
              classId: this.$store.getters.defaultClassId
            }
          }
        }
      ]
    }
  },

  created() {
    this.$store.dispatch('shelf/getSummary')
  }
}
</script>

<style scoped lang="stylus">
  @import '../../../project-ui/stylus/settings.styl'
  .home-view
    padding 24px 0

    .board-section
      padding 16px 0 32px 0

    &__header
      text-align center

    &__pdf
      font-size 12px

      ul
        list-style disc

    &__board
      text-align center
      line-height 1.2
      cursor pointer
      padding 16px
      border-radius 8px

      &:hover
        box-shadow $box-shadow

      h3
        color $font-color-3
        font-size 18px
        font-weight bold
        margin-bottom 8px
        margin-top 4px

      p
        font-size 13px
        color $font-color-2


</style>
