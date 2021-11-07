<template>
  <div id="app">
    <div id="nav">
      <router-link class="home" to="/">E-Shop</router-link>
      <div>
        <router-link class="cartLink" to="/cart">
          <div class="number-cart">
            {{cart.length}}
          </div>
        </router-link>
        <router-link class="cartLink" to="/cart"><img class="cart" src="cart.png"/></router-link>
      </div>
    </div>
    <router-view :cart="cart" :search="search" @rmvGameCart="rmvGameCart" @addGameCart="addGameCart"/>
    <footer class="footer-distributed">
      <div class="footer-center">
        <p class="footer-links">
          <router-link class="link-1" to="/">E-Shop</router-link>
          <router-link class="aboutus" to="/aboutus">About Us</router-link>
          <router-link class="aboutus" to="/Faq">Faq</router-link>
        </p>
        <p>E-Shop &copy; 2021</p>
      </div>
    </footer>
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
      game.amount = 1;
      this.cart.push(game);
    },
    rmvGameCart(game){
      game.amount = 0;
      for (let index = 0; index < this.cart.length; index++) {
        if(this.cart[index].id == game.id)
          this.cart.splice(index,1);
      }
    }
  }
}
</script>


<style>
html, body{
  background-color: #191A1D;
  font-family: poppins,sans-serif;
  padding:0;
  min-height:100vh;
  margin:0;
  position:relative;
}

body::after {
  content: '';
  display: block;
  height: 54px; /* Set same as footer's height */
}

#app {

  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: white;
}

#nav {
  padding: 0 10px 0 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #292c2f;
  
}

#nav a {
  font-weight: bold;
  font-size: 1.2em;
  color: #FF6400;
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
  color: #FF6400;
  font-size: .9em;
}

.footer-distributed {
  background-color: #292c2f;
  box-sizing: border-box;
  width: 100%;
  text-align: center;
  font: normal 16px sans-serif;
  padding-bottom: 7px;
  position: absolute;
  bottom: 0;
}

.footer-distributed .footer-center p {
  color: #8f9296;
  font-size: 10px;
  margin: 0;
}

.footer-distributed p.footer-links {
  font-size: 15px;
  font-weight: bold;
  color: #ffffff;
  padding: 0;
  transition: ease .25s;
}

.footer-distributed p.footer-links a {
  display: inline-block;
  line-height: 1.8;
  text-decoration: none;
  color: inherit;
  transition: ease .25s;
}

.footer-distributed .footer-links a:before {
  content: "·";
  font-size: 20px;
  padding-left: 5px;
  color: #fff;
  display: inline-block;
  padding-right: 5px;
}

.footer-distributed .footer-links .link-1:before {
  content: none;
}

.footer-distributed p.footer-links a:hover{text-decoration:underline;}

</style>

