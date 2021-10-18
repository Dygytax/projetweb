<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/cart">Cart</router-link>
    </div>
    <router-view :cart="cart" @addGameCart="addGameCart"/>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cart: []
    };
  },
  methods: {
    addGameCart(gameId){
      this.cart.push(gameId);
    }
  }
}
</script>


<style>
html{
  background-color: #191A1D;
  font-family: poppins,sans-serif;
}
#app {

  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: white;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: white;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

a {
  text-decoration: none;
}

</style>

