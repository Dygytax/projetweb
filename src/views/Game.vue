<template>
  <div>
    {{this.game.name}}
    <template v-if="gameAlreadyInCart() === 0">
        <button  @click="addToCart()">Add to cart</button>
    </template>
    <template v-else>
      <p>game already added to Cart</p>
    </template>
    
  </div>
</template>

<script>
import axios from "axios";

export default {
  props:{
    cart: {type: Array}
  },
  data() {
    return {
      game:''
    };
  },
  methods: {
    addToCart(){
      this.$emit('addGameCart', this.game) 
    },
    gameAlreadyInCart(){
      var bool;
      this.cart.forEach(element => {
        if(element.name == this.game.name){
          bool =1;
          return;
        }
      });
      if(bool ==1)
        return 1
      return 0;
    }
  },
  async mounted() {
    await axios
    .get('https://api.rawg.io/api/games/'+this.$route.params.id+'?key=8f64c448bc4e47458360ccd1213d4d1c&platforms=4,18,186,187')
    .then( response => {
      this.game = response.data;
    }) 
  }
};
</script>