<template>
  <div class="all">


    <div class="filter">
      <select v-model="platform">
        <option disabled value="4,18,186,187">Platform</option>
        <option value="4">PC</option>
        <option value="186">XBOX X</option>
        <option value="18">PS4</option>
        <option value="187">PS5</option>
      </select>
      <hr />
      <select v-model="order">
        <option disabled value="">Order By</option>
        <option value="name">Name</option>
        <option value="released">Released</option>
        <option value="-rating">Rating</option>
      </select>
      <hr />
      <div class="filterCheckbox" >
        <input type="checkbox"  id="Racing" value="1" v-model="genre">

        <label for="Racing" v-on:click="refresh()">Racing</label>
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


      <button @click="refresh()">Refresh</button>
    </div>

    <div class="right">
      <div class="liste_jeux">
        <div v-for="(game, index) in games" :key="index">
          <div class="jeux" @click="$router.push('/game/' + game.id)">
            <div class="imageJeux">
              <img  v-bind:src= game.background_image>
            </div>
            <div class="textGame">
              <div class="infoGame">
                <p>{{game.name}}</p>
                <p class="rating">{{arrondir(game.rating)}}</p>
              </div>
              <div class="genresRelease">
                <div class="genres">
                  <p style="opacity: 0.7;">{{concatenerGenres(game.genres)}}</p>
                </div>
                <p style="opacity: 0.5;">{{game.released}}</p>
              </div>
              <p>$ {{game.id%40+15}}</p>
            </div>
          </div>
        </div>
      </div>
      <button @click="loadMoreGames()">view more</button>
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
      order:''
    };
  },
  watch: {
    model(currentValue) {
      this.$emit('input', currentValue)
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
    },
    async refresh(){
      console.log(this.genre);
      if(this.genre[0] != null){
        let genres = this.genre[0];//Transforme le tableau d'id de genre en un string
        for (let j = 1; j < this.genre.length; j++) {
          genres += ","+this.genre[j];
        }

        await axios
            .get('https://api.rawg.io/api/games?key=8f64c448bc4e47458360ccd1213d4d1c&platforms='+this.platform+'&genres='+genres+'&ordering='+this.order)
            .then( response => {
              this.games = response.data.results;
              this.next = response.data.next
            })
      }
      else{
        await axios
            .get('https://api.rawg.io/api/games?key=8f64c448bc4e47458360ccd1213d4d1c&platforms='+this.platform+'&ordering='+this.order)
            .then( response => {
              this.games = response.data.results;
              this.next = response.data.next
            })
      }
    }
  },
  async mounted() {
    console.log(this.cart);
    await axios
        .get('https://api.rawg.io/api/games?key=8f64c448bc4e47458360ccd1213d4d1c&platforms=4,18,186,187')
        .then( response => {
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
  justify-content: flex-start;
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
  border: 1px solid rgba(255, 255, 255, 0.12);
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
  height: 80%;
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
  min-height: 30%;
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
  height: 12px;
  padding-left: 0.2em;
  padding-bottom: 0.3em;

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


</style>
