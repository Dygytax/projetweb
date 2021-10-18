<template>
  <div>
    <div v-for="(game, index) in cart" :key="index">
      {{game.name}}
    </div>
  </div>
</template>

<script>
export default {
  props:{
    cart: {type: Array}
  },
  data() {
    return {
    };
  },
  methods: {

  },
  async mounted() {
  }
};
</script>