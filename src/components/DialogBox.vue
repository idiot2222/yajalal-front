<template>
  <v-dialog
      persistent
      max-width="600"
      :value="isOpened"
  >
    <template v-slot:default="dialog">
      <v-card>
        <v-toolbar
            class="text-h6"
            :color="subColor"
            dark
        >{{ title }}
        </v-toolbar>
        <v-card-text>
          <div class="text-h4 px-10 pt-6 text-center">{{ text }}</div>
        </v-card-text>
        <v-card-actions class="justify-end">
          <v-btn
              text
              @click="redirectHandler(dialog)"
          >닫기
          </v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>

<script>
import {mapState} from "vuex";

export default {
  name: "DialogBox",
  data() {
    return {}
  },
  methods: {
    redirectHandler(dialog) {
      dialog.value = false;

      this.$router.push(this.redirectUrl);
    }
  },
  components: {},
  props: [
    'title', 'text', 'isOpened', 'redirectUrl'
  ],
  computed: {
    ...mapState({
      subColor: state => state.subColor,
    })
  },
}
</script>

<style>
</style>