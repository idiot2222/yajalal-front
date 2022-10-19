<template>
<v-card>
  <v-card-title class="title">리그 순위</v-card-title>
  <v-simple-table>
    <template v-slot:default>
      <thead>
      <tr>
        <th class="text-left">
          순위
        </th>
        <th class="text-left">
          팀명
        </th>
        <th class="text-left">
          경기
        </th>
        <th class="text-left">
          승
        </th>
        <th class="text-left">
          무
        </th>
        <th class="text-left">
          패
        </th>
      </tr>
      </thead>
      <tbody>
      <tr
          v-for="(item, n) in items"
          :key="n"
      >
        <td>{{ n+1 }}</td>
        <td>{{ item.teamName }}</td>
        <td>{{ item.win + item.lose + item.draw }}</td>
        <td>{{ item.win }}</td>
        <td>{{ item.draw }}</td>
        <td>{{ item.lose }}</td>
      </tr>
      </tbody>
    </template>
  </v-simple-table>
</v-card>
</template>

<script>
export default {
  name: "TeamRankingBox",
  data() {
    return {
    }
  },
  methods: {
  },
  components: {
  },
  props: [
      'items',
  ]
}
</script>

<style>
.textLine {
  display: block;
}
</style>