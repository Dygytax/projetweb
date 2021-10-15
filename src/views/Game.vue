<template>
  <div>
    <h1>This is a game page</h1>
    {{this.game.name}}
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      game:''
    };
  },
  methods: {
  },
  async mounted() {
    console.log(this.$route.params.id);
    await axios
    .get('https://api.rawg.io/api/games/'+this.$route.params.id+'?key=8f64c448bc4e47458360ccd1213d4d1c&platforms=4,18,186,187')
    .then( response => {
      console.log(response.data);
      this.game = response.data;
    }) 
  }
};
</script>