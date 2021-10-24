<template>
  <div id="app">
    <div id="nav">
      <router-link class="home" to="/">E-Shop</router-link>
      <div>
        <div class="number-cart">
          {{cart.length}}
        </div>
        <router-link class="cartLink" to="/cart"><img class="cart" src="cart.png"/></router-link>
      </div>
      
    </div>
    <router-view :cart="cart" :search="search" @rmvGameCart="rmvGameCart" @addGameCart="addGameCart"/>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cart: [],
      search: ''
    };
  },
  methods: {
    addGameCart(game){
      this.cart.push(game);
    },
    rmvGameCart(game){
      console.log("fzaf");
      for (let index = 0; index < this.cart.length; index++) {
        if(this.cart[index].id == game.id)
          this.cart.splice(index,1);
      }
    }
  }
}
</script>


<style>
html{
  background-color: #191A1D;
  font-family: poppins,sans-serif;
  overflow-y: overlay;
}
#app {

  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: white;
}

#nav {
  padding: 20px 45px 30px 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

#nav a {
  font-weight: bold;
  color: white;
}

#nav a.router-link-exact-active {
  color: orange;
  font-size: 1.2em;
}

a {
  text-decoration: none;
}

.cart{
  width: 60px;
  height: 40px;
}

.number-cart{
  transform: translate(-4%, 50%);
  color: orange;
  font-size: .9em;
}

</style>

