<template>
  <div>
    <div class="search-box">
        <div class="wrap-input">
          <input type="text" class="input-search" placeholder="Type to Search..." v-model="search">
          <svg width="20px" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="search" class="svg-inline--fa fa-search fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"></path></svg>
        </div>
      </div>
    <div class="all">
      <div class="filter">
        <select v-model="platform">
          <option disabled value="4,18,186,187">Platform</option>
          <option value="4,18,186,187">ALL</option>
          <option value="4">PC</option>
          <option value="186">XBOX X</option>
          <option value="18">PS4</option>
          <option value="187">PS5</option>
        </select>
        <hr />
        <select v-model="order">
          <option disabled value="">Order By</option>
          <option value="">Trend</option>
          <option value="name">Name</option>
          <option value="released">Released</option>
          <option value="-rating">Rating</option>
        </select>
        <hr />
        <div class="filterCheckbox" >
          <input type="checkbox"  id="Racing" value="1" v-model="genre">
          <label for="Racing">Racing</label>
        </div>
        <div class="filterCheckbox">
          <input type="checkbox" id="Shooter" value="2" v-model="genre">
          <label for="Shooter">Shooter</label>
        </div>
        <div class="filterCheckbox">
          <input type="checkbox" id="Adventure" value="3" v-model="genre">
          <label for="Adventure">Adventure</label>
        </div>
        <div class="filterCheckbox">
          <input type="checkbox" id="Action" value="4" v-model="genre">
          <label for="Action">Action</label>
        </div>
        <div class="filterCheckbox">
          <input type="checkbox" id="RPG" value="5" v-model="genre">
          <label for="RPG">RPG</label>
        </div>
        <div class="filterCheckbox">
          <input type="checkbox" id="Fighting" value="6" v-model="genre">
          <label for="Fighting">Fighting</label>
        </div>
        <div class="filterCheckbox">
          <input type="checkbox" id="Strategy" value="10" v-model="genre">
          <label for="Strategy">Strategy</label>
        </div>
        <div class="filterCheckbox">
          <input type="checkbox" id="Arcade" value="11" v-model="genre">
          <label for="Arcade">Arcade</label>
        </div>
        <div class="filterCheckbox">
          <input type="checkbox" id="Simulation" value="14" v-model="genre">
          <label for="Simulation">Simulation</label>
        </div>
        <div class="filterCheckbox">
          <input type="checkbox" id="Sports" value="15" v-model="genre">
          <label for="Sports">Sports</label>
        </div>
        <div class="filterCheckbox">
          <input type="checkbox" id="Card" value="17" v-model="genre">
          <label for="Card">Card</label>
        </div>
        <div class="filterCheckbox">
          <input type="checkbox" id="Family" value="19" v-model="genre">
          <label for="Family">Family</label>
        </div>
        <div class="filterCheckbox">
          <input type="checkbox" id="Board Games" value="28" v-model="genre">
          <label for="Board Games">Board Games</label>
        </div>
        <div class="filterCheckbox">
          <input type="checkbox" id="Educational" value="34" v-model="genre">
          <label for="Educational">Educational</label>
        </div>
        <div class="filterCheckbox">
          <input type="checkbox" id="Casual" value="40" v-model="genre">
          <label for="Casual">Casual</label>
        </div>
        <div class="filterCheckbox">
          <input type="checkbox" id="Indie" value="51" v-model="genre">
          <label for="Indie">Indie</label>
        </div>
        <div class="filterCheckbox">
          <input type="checkbox" id="Platformer" value="83" v-model="genre">
          <label for="Platformer">Platformer</label>
        </div>
      </div>

      <div class="right">
        <div class="liste_jeux">
          <div class="block_jeux" v-for="(game, index) in games" :key="index">
            <div class="jeux">
              <div class="imageJeux" @click="$router.push('/game/' + game.id)">
                <img  v-bind:src= game.background_image>
              </div>
              <div class="textGame">
                <div class="infoGame" @click="$router.push('/game/' + game.id)">
                  <p>{{game.name}}</p>
                  <p class="rating">{{arrondir(game.rating)}}</p>
                </div>
                <div class="genresRelease" @click="$router.push('/game/' + game.id)">
                  <div class="genres">
                    <p style="opacity: 0.7;">{{concatenerGenres(game.genres)}}</p>
                  </div>
                  <p style="opacity: 0.5;">{{game.released}}</p>
                </div>
                <div class="priceCart">
                  <p>$ {{game.id%40+15}}</p>
                  <template v-if="gameAlreadyInCart(game.name) === 0">
                    <div class="buttonAdd" @click="addToCart(game)"><img class="cart2" src="cart.png"/></div>
                  </template>
                  <template v-else>
                    <div class="buttonRmv" @click="rmvFromCart(game)"><img class="cart2" src="cart.png"/></div>
                  </template>
                </div>
              </div>
            </div>
          </div>
        </div>
        <button class="button-28" role="button" @click="loadMoreGames()">view more</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  props:["cart"],
  data() {
    return {
      games : '',
      next: '',
      platform: '4,18,186,187',
      genre:[],
      order:'',
      search:''
    };
  },
  watch: {
    genre: function(){
      this.refresh();
    },
    platform: function(){
      this.refresh();
    },
    order: function(){
      this.refresh();
    },
    search: function(){
      this.research();
    }
  },
  methods: {
    async loadMoreGames(){
      axios
          .get(this.next)
          .then( response => {
            this.games = this.games.concat(response.data.results);
            this.next = response.data.next;
          })
    },
    addToCart(game){
      this.$emit('addGameCart', game)
    },
    rmvFromCart(game){
      this.$emit('rmvGameCart', game)
    },
    arrondir(rating){
      let res = rating.toFixed(2);
      res = res.slice(0, 3)
      return res;
    },
    concatenerGenres(genre){
      if(genre[0]==null)
        return '';
      var str = genre[0].name;
      for (let index = 1; index < genre.length; index++) {

        if(genre[index].name != "massively multiplayer")
          str += ', '+genre[index].name;
      }
      return str;
    },
    gameAlreadyInCart(name){
      var bool;
      this.cart.forEach(element => {
        if(element.name == name){
          bool =1;
          return;
        }
      });
      if(bool ==1)
        return 1
      return 0;
    },
    async refresh(){
      if(this.genre[0] != null){
        let genres = this.genre[0];//Transforme le tableau d'id de genre en un string
        for (let j = 1; j < this.genre.length; j++) {
          genres += ","+this.genre[j];
        }

        await axios
            .get('https://api.rawg.io/api/games?key=8f64c448bc4e47458360ccd1213d4d1c&platforms='+this.platform+'&genres='+genres+'&ordering='+this.order)
            .then( response => {
              response.data.results.forEach(element => {
                element.amount =0;
              });
              this.games = response.data.results;
              this.next = response.data.next
            })
      }
      else{
        await axios
            .get('https://api.rawg.io/api/games?key=8f64c448bc4e47458360ccd1213d4d1c&platforms='+this.platform+'&ordering='+this.order)
            .then( response => {
              response.data.results.forEach(element => {
                element.amount =0;
              });
              this.games = response.data.results;
              this.next = response.data.next
            })
      }
    },
    async research(){
      await axios
        .get('https://api.rawg.io/api/games?key=8f64c448bc4e47458360ccd1213d4d1c&search='+this.search)
        .then( response => {
          response.data.results.forEach(element => {
            element.amount =0;
          });
          this.games = response.data.results;
          this.next = response.data.next
        })
    }
  },
  async mounted() {
    await axios
      .get('https://api.rawg.io/api/games?key=8f64c448bc4e47458360ccd1213d4d1c&platforms=4,18,186,187')
      .then( response => {
        response.data.results.forEach(element => {
          element.amount =0;
        });
        this.games = response.data.results;
        this.next = response.data.next
      })
    
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap');
h1{
  font-weight: 500;
  font-size: 24px;
  line-height: 42px;
  margin: 0;
}
.liste_jeux{
  justify-content: center;
  display: flex;
  flex-wrap: wrap;
}
.jeux{
  margin: 10px;
  width: 280px;
  height: 400px;
  position: relative;
  display: flex;
  justify-content: space-between;
  flex-flow: column;
  overflow: hidden;
  border-radius: 10px;
  cursor: pointer;
  text-align: left;
  /* From https://css.glass */
  background-image: linear-gradient(to top, #191a1d, #1c2330, #1d2c44, #1a355a, #0e3f70);
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  border: 1px solid #121212;;
}

.block_jeux:hover{

  transform: scale(1.04); 
}

.block_jeux{
  transition: 0.5s;

}

.jeux p{
  margin: 0;
}

.filter{
  width: 20%;
  box-sizing: border-box;
  padding: 32px;
  background: #121212;
  margin-bottom: auto;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  text-align: left;

}

.right{
  width: 80%;
}

.all{
  display: flex;
  flex-direction: row;
  margin-left: 5%;
  margin-right: 5%;
  margin-bottom: 1%;
  margin-top: 50px;
}

select{
  background: transparent;
  color: white;
  border: none;
  font-family: poppins,sans-serif;
}

select option {

  background-color: black;
  border-color: black;
  padding: 8px;
  border-radius: 10px;
  width: 200px;
  display: flex;
  flex-flow: column;
  box-sizing: border-box;

}

hr{
  width: 100%;
  margin-bottom: 20px;
  margin-top: 20px;
}

.imageJeux{
  height: 65%;
  max-height: 65%;
  min-height: 65%;
}

img{
  width: 100%;
  height: 100%;
  background-size: cover;
  object-fit: cover;
}

.infoGame {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.textGame{
  height: 30%;
  min-height: 30%;
  max-height: 30%;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.genres{
  display: flex;
  flex-direction: row;
}

.genresRelease{
  font-size: 0.7em;

}

.rating{
  border: solid white;
  border-radius: 50%;
  border-width: 1.5px;
  padding: 4px;
  font-size: 0.7em ;
  max-width: 18px;
  max-height: 17px;
}


.priceCart{
  display: flex;
  justify-content: space-between;
  align-items: center;
}



.cart2{
  width: 40px;
  height: 25px;
  padding-bottom: 7px;
}

.buttonAdd{
  border-radius: 4px;
  background-color: transparent;
  color: #fff;
  text-align: center;
  font-size: 32px;
  width: 50px;
  height: 30px;
  transition: all 0.5s;
  cursor: pointer;
  box-shadow: 0 10px 20px -8px rgba(0, 0, 0,.7);
  border: 0.1mm solid rgba(0, 0, 0, 0.6);
  border-radius: 10px;
}

.buttonAdd{
  cursor: pointer;
  display: inline-block;
  position: relative;
  transition: 0.5s;
}

.buttonAdd:after {
  content: '+';
  position: absolute;
  color: white;
  font-size: 0.6em;
  margin-top: auto;
  margin-bottom: auto;
  opacity: 0;  
  right: -20px;
  transition: 0.5s;
  padding-bottom: 7px;
}

.buttonAdd:hover{
  padding-right: 15px;
}

.buttonAdd:hover:after {
  opacity: 1;
  right: 10px;
  color:orange;
}


.buttonRmv{
  border-radius: 4px;
  background-color: transparent;
  color: #fff;
  text-align: center;
  font-size: 32px;
  width: 50px;
  height: 30px;
  transition: all 0.5s;
  cursor: pointer;
  box-shadow: 0 10px 20px -8px rgba(0, 0, 0,.7);
  border: 0.1mm solid rgba(0, 0, 0, 0.6);
  border-radius: 10px;
  padding-right: 15px;
}

.buttonRmv{
  cursor: pointer;
  display: inline-block;
  position: relative;
  transition: 0.5s;
}

.buttonRmv:after {
  content: '-';
  position: absolute;
  color:orange;
  font-size: 0.6em;
  margin-top: auto;
  margin-bottom: auto;
  right: 10px;
  transition: 0.5s;
  padding-bottom: 7px;
}






/*checkbox*/
label{
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  
}

input[type=checkbox] + label {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 1em;
  cursor: pointer;
  padding: 0.2em;
  
}

input[type=checkbox] {
  display: none;
}

label{
  vertical-align: middle;
  display:inline;
  line-height:80%;
}

input[type=checkbox] + label:after {
  content: "\2714";
  border: 0.1em solid #000;
  border-radius: 0.2em;
  display: inline-block;
  width: 15px;
  height: 15px;
  padding-left: 0.1em;
  padding-top: 0.15em;
 
  vertical-align: bottom;
  color: #4A4A4A;
  transition: .2s;
}

input[type=checkbox] + label:active:after {
  transform: scale(0);
}

input[type=checkbox]:checked + label:after {
  color: #fff;
}



/*button*/
.button-28 {
  appearance: none;
  background-color: white;
  border: 2px solid #1A1A1A;
  border-radius: 10px;
  box-sizing: border-box;
  color: black;
  cursor: pointer;
  display: inline-block;
  font-size: 0.8em;
  font-weight: 600;
  line-height: normal;
  margin: 0;
  min-height: 40px;
  min-width: 0;
  max-height: 200px;
  max-width: 100px;
  outline: none;
  padding: 5px 5px;
  text-align: center;
  text-decoration: none;
  transition: all 300ms cubic-bezier(.23, 1, 0.32, 1);
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  width: 100%;
  will-change: transform;
}

.button-28:disabled {
  pointer-events: none;
}

.button-28:hover {
  color: #fff;
  background-color: #FF6400;
  box-shadow: rgba(0, 0, 0, 0.25) 0 8px 15px;
  transform: translateY(-2px);
}

.button-28:active {
  box-shadow: none;
  transform: translateY(0);
}

/*search bar*/
.search-box{
  box-sizing: border-box;
  width: fit-content;
  height: fit-content;
  display: flex;
  position: absolute;
  left: 50%;
  top: 0%;
  padding-top: 10px;
  transform: translate(-50%);
}
.input-search{
  box-sizing: border-box;
  height: 40px;
  width: 50px;
  border-style: none;
  padding: 10px;
  letter-spacing: 2px;
  outline: none;
  border-radius: 25px;
  transition: all .5s ease-in-out;
  background-color: #00C9C8;
  padding-right: 40px;
  color:#fff;
}
.input-search::placeholder{
  color:rgba(255,255,255,.5);
  letter-spacing: 1px;
  font-weight: 100;
}
.input-search{
  width: 300px;
  border-radius: 0px;
  background-color: transparent;
  transition: all 500ms cubic-bezier(0, 0.110, 0.35, 2);
}
.input-search:focus{
  width: 400px;
  border-radius: 0px;
  background-color: transparent;
  
  transition: all 500ms cubic-bezier(0, 0.110, 0.35, 2);
}

.wrap-input{
  display: flex;
  border-bottom:1px solid rgba(255,255,255,.5);
}
</style>
