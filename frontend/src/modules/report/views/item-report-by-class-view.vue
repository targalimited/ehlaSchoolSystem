<template>
  <div>
    <vi-app-bar :title="`${$route.params.class} Report`">
      <div slot="append">
        <vi-select :options="itemOptions" v-model="selectedItem" placeholder="Select an assignment"/>
      </div>
    </vi-app-bar>
    <div style="margin-top: 56px" v-if="selectedItem">
      <vi-data-table
        :items="items"
        :headers="headers"
        :pagination.sync="pagination"
        item-height="80"
      >
        <template slot="item" slot-scope="{item}">
          <vi-table-col>{{item.studentName}}</vi-table-col>
          <vi-table-col>{{item.ex1}}</vi-table-col>
          <vi-table-col>{{item.ex2}}</vi-table-col>
          <vi-table-col>{{item.ex3}}</vi-table-col>
          <vi-table-col>{{item.ex1 + item.ex2 + item.ex3}}</vi-table-col>
        </template>
      </vi-data-table>
    </div>

  </div>
</template>

<script>
  export default {
    name: 'item-report-by-class-view',
    data () {
      return {
        // the list of asmt assigned to the current class
        itemOptions: [
          'The Story of Number',
          'A Day in Disney',
          'Travel in HK'
        ],
        selectedItem: '',
        items: [
          {
            studentName: 'Chan Tai Ming',
            ex1: 10,
            ex2: 8,
            ex3: 9
          },
          {
            studentName: 'Fan Tai Ming',
            ex1: 4,
            ex2: 3,
            ex3: 8
          },
          {
            studentName: 'Ki Tai Ming',
            ex1: 7,
            ex2: 7,
            ex3: 5
          },
          {
            studentName: 'Chan Tai Ming 2',
            ex1: 10,
            ex2: 8,
            ex3: 9
          },
          {
            studentName: 'Fan Tai Ming 2',
            ex1: 4,
            ex2: 3,
            ex3: 8
          },
          {
            studentName: 'Ki Tai Ming 2',
            ex1: 7,
            ex2: 7,
            ex3: 5
          }
        ],
        pagination: {},
        headers: [
          {
            text: 'Name',
            index: 'studentName',
            sortable: true,
            searchable: true,
            expand: true
          },
          {
            text: 'Ex1',
            index: 'ex1',
            sortable: true,
            searchable: true,
            width: '80px'
          },
          {
            text: 'Ex2',
            index: 'ex2',
            sortable: true,
            searchable: true,
            width: '80px'
          },
          {
            text: 'Ex3',
            index: 'ex3',
            sortable: true,
            searchable: true,
            width: '80px'
          },
          {
            text: 'Total',
            width: '80px'
          }
        ]
      }
    }
  }
</script>
