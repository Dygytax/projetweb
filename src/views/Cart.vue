<template>
  <div>
    <div class="all">
      <div class="left">
        <div class="entete" >
          <div class="name">Product</div>
          <div>Price</div>
          <div class="qty">Quantity</div>
          <div>Total</div>
        </div>
        <hr class="toptable" />
        <div v-for="(game, index) in cart" :key="index">
          <div class="product">
            <div class="item" @click="$router.push('/game/' + game.id)">
              <img class="image" v-bind:src= game.background_image>
              {{game.name}}
            </div>
            <div>
              $ {{game.id%40+15}}
            </div>
            <div class="svgs">
              <div class="center" @click="decrement(index)">
                <svg  aria-hidden="true" focusable="false" data-prefix="fas" data-icon="minus" class="svg-inline--fa fa-minus fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"></path></svg>
              </div>
              <div class="amount">
                {{game.amount}}
              </div>
              <svg @click="game.amount++"  aria-hidden="true" focusable="false" data-prefix="fas" data-icon="plus" class="svg-inline--fa fa-plus fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"></path></svg>
            </div>
            <div>
              $ {{(game.id%40+15)*(game.amount)}}
            </div>
          </div>
          <hr class="betweenproduct" />
        </div>
      </div>
      <hr class="middle" />
      <div class="right">
        <h1>Summary</h1>
        <div class="containercreditcard">
          <div class="creditcardfirstdiv">
            <p>Card Number</p>
            <input type="text" placeholder=". . . .   . . . .   . . . .   . . . ." class="number">
          </div>
          <div class="creditcardseconddiv">
            <p>Name</p>
            <input type="text" placeholder="Thomas Peter" class="namecard">
          </div>
          <div class="creditcardthirddiv">
            <div>
              <p>Expiry Date</p>
              <input type="text" placeholder="mm/yyyy" class="date">
            </div>
            <div class="divcvv">
              <p>CVV</p>
              <input type="text" placeholder=". . ." class="cvv">
            </div>
          </div>
          <hr />
          <p class="deliveryText">Delivery Address</p>
          <input type="text" placeholder="04 street London England" class="deliveryInput">
          <hr />
        </div>
        <div class="calcultotal">
          <div class="textvalue">
            <p>Subtotal</p>
            <p>$ {{total()}}</p>
          </div>
          <div class="textvalue">
            <p>Tax</p>
            <p>$ {{tax()}}</p>
          </div>
          <div class="textvalue">
            <p class="totaltext">Total</p>
            <p class="totalvalue">$ {{totalwithtax()}}</p>
          </div>
          <hr />
        </div>
        <div>
            <button class="buttonAdd" @click="clearCart()" >Checkout</button>
          </div>
      </div>
    </div>
    <div v-if="validatePurchase === true" class="backgroundPurchase"  @click="validatePurchase = false"></div>
    <div v-if="validatePurchase === true" class="purchaseMade" @click="validatePurchase = false">
      <h1>Felicitation</h1>
      <p>Purchase made!</p>
      <p>You'll receive your order in the next few days</p>
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
      validatePurchase: false
    };
  },
  methods: {
    //Vider le panier
    clearCart(){
      while(this.cart[0] != null)
        this.rmvFromCart(this.cart[0])
      this.validatePurchase = true;
    },
    //Décrémente les élements du panier
    decrement(index){
      if(this.cart[index].amount > 0)
        this.cart[index].amount--
      if(this.cart[index].amount == 0)
        this.rmvFromCart(this.cart[index])
    },
    //Retirer un élement du panier
    rmvFromCart(game){
      this.$emit('rmvGameCart', game)
    },
    //Calculer le prix total du panier
    total(){
      var total = 0;
      this.cart.forEach(element => {
        total += (element.amount) * (element.id%40+15);
      });
      return total;
    },
    //Calculer la tax du total du panier
    tax(){
      return this.arrondir(this.total()*(3/100));
    },
    //Somme de la tax et du total
    totalwithtax(){
      let res=0;
      res += parseFloat(this.tax(), 10);
      res += parseFloat(this.total());
      return res;
    },
    //Arrondir les prix
    arrondir(number){
      let res = number.toFixed(2);
      res = res.slice(0)
      return res;
    },
  },
  async mounted() {
  }
};
</script>

<style scoped>
.name{
  width: 300px;
}

.displaycart{
  display: flex;
  flex-direction: column;
}

.product{
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  margin-top: 40px;
}

.entete{
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
}

.all{
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
}

.left{
  margin-top: 30px;
  width: 60%;
  min-width: 700px;
  height: 80vh;
  overflow: hidden;
  overflow-y: scroll;
  padding-right: 5vw;
  padding-left: 5vw;
}

.left::-webkit-scrollbar {
  width: 10px;
  background-color: rgba(0, 0, 0, 0.267);
  border-radius: 20px;
}
.left::-webkit-scrollbar-thumb {
  background-color: black;
  border-radius: 20px;
}

.right{
  margin-left: auto;
  margin-right: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
}

@media screen and (max-width: 800px) {
  .image{
    display: none;
  }
  .item{
    max-width: 100px;
  }
  .left{
    min-width: 100%;
    max-width: 100%;
    padding-left: 10px;
    padding-right: 10px;
    height: auto;
  }
  .name{
    max-width: 100px;
  }
  .middle{
    display: none;
  }
}

.image{
  border-radius: 5px;
  width: 90px;
  height: 120px;
  background-size: cover;
  object-fit: cover;
  object-position: top;
  margin-bottom: 10px;
}

.item{
  display: flex;
  flex-direction: column;
  width: 300px;
  align-items: center;
  cursor: pointer;
}

.svgs{
  display: flex;
  flex-direction: row;
  align-items: center;
}

svg{
  width: 15px;
  margin-right: 10px;
  margin-left: 10px;
  top: 100%;
  position: relative;
  cursor: pointer;
}

.qty{
  width: 75px;
}

.amount{
  color: #FF6400;
}

.center{
  display: flex;
}

.containercreditcard{
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 300px;
}
.containercreditcard hr{
  margin-top: 30px;
  margin-bottom: 20px;
  width: 300px;
}
.containercreditcard input{
  border: 2px solid #eee;
  border-radius: 4px;
  width: auto;
  height: 35px;
}

.divcvv input{
  width: 82px;
}
.containercreditcard input::placeholder{
  font-size: 13px;
  line-height: 3;
  font-family: poppins,sans-serif;
}

.containercreditcard p{
  margin-bottom: 5px;
}

.creditcardfirstdiv{
  display: flex;
  flex-direction: column;
  text-align: left;
}

.creditcardseconddiv{
  display: flex;
  flex-direction: column;
  text-align: left;
  width: 100%;
}

.creditcardthirddiv{
  display: flex;
  text-align: left;
  justify-content: space-between;
  width: 100%;
}

.deliveryAddress{
  text-align: left;
  width: 300px;
}

.cvv{
  width: 100%;
}

.date{
  width: 100%;
}

.namecard{
  width: 100%;
}

.number{
  width: 100%;
}

.divcvv{
  width: 30%;
}

.buttonAdd {
  width: 200px;
  height: 40px;
  margin-bottom: 20px;
  appearance: none;
  background-color: #FF6400;
  border: 2px solid #1A1A1A;
  border-radius: 10px;
  box-sizing: border-box;
  color: white;
  cursor: pointer;
  display: inline-block;
  font-size: 0.8em;
  font-weight: 600;
  line-height: normal;
  outline: none;
  text-align: center;
  text-decoration: none;
  transition: all 300ms cubic-bezier(.23, 1, 0.32, 1);
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  will-change: transform;
  font-family: poppins,sans-serif;
}

.buttonAdd:disabled {
  pointer-events: none;
}

.buttonAdd:hover {
  color: black;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.25) 0 8px 15px;
  transform: translateY(-2px);
}

.buttonAdd:active {
  box-shadow: none;
  transform: translateY(0);
}

.textvalue{
  display: flex;
  justify-content: space-between;
  width: 300px;
}

.textvalue p{
  margin-top: 10px;
  margin-bottom: 10px;
}

.calcultotal hr{
  margin-top: 20px;
  margin-bottom: 30px;
}

.middle{
  height: 85vh;
  margin: 0;
}

.top{
  margin: 0;
}

.toptable{
  width: 120%;
  left: 0;
  opacity: .2;
  transform: translate(-10%);
}
hr{
  opacity: .6;
}
.betweenproduct{
  opacity: .2;
}

.totalvalue{
  font-weight: bold;
}

.totaltext{
  font-weight: bold;
}

.purchaseMade{
  background-color: #292c2f;
  width: 250px;
  padding-left: 20px;
  padding-right: 20px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50% ,-50%);
  z-index: 11;
  border-radius: 10px;
  opacity: 1;
}
.backgroundPurchase{
  width: 100%;
  height: 100%;
  background-color: black;
  opacity: 0.4;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
}

.deliveryInput{
  width: 100%;
}

.deliveryText{
  margin-top: 0;
  text-align: left;
}
</style>