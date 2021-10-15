<template>
  <div>
    <select v-model="platform">
      <option disabled value="4,18,186,187">Platform</option>
      <option value="4">PC</option>
      <option value="186">XBOX X</option>
      <option value="18">PS4</option>
      <option value="187">PS5</option>
    </select>

    <select v-model="order">
      <option disabled value="">Order By:</option>
      <option value="name">Name</option>
      <option value="released">Released</option>
      <option value="rating">Rating</option>
    </select>

    <input type="checkbox" id="Racing" value="1" v-model="genre">
    <label for="Racing">Racing</label>
    <input type="checkbox" id="Shooter" value="2" v-model="genre">
    <label for="Shooter">Shooter</label>
    <input type="checkbox" id="Adventure" value="3" v-model="genre">
    <label for="Adventure">Adventure</label>
    <input type="checkbox" id="Action" value="4" v-model="genre">
    <label for="Action">Action</label>
    <input type="checkbox" id="RPG" value="5" v-model="genre">
    <label for="RPG">RPG</label>
    <input type="checkbox" id="Fighting" value="6" v-model="genre">
    <label for="Fighting">Fighting</label>
    <input type="checkbox" id="Strategy" value="10" v-model="genre">
    <label for="Strategy">Strategy</label>
    <input type="checkbox" id="Arcade" value="11" v-model="genre">
    <label for="Arcade">Arcade</label>
    <input type="checkbox" id="Simulation" value="14" v-model="genre">
    <label for="Simulation">Simulation</label>
    <input type="checkbox" id="Sports" value="15" v-model="genre">
    <label for="Sports">Sports</label>
    <input type="checkbox" id="Card" value="17" v-model="genre">
    <label for="Card">Card</label>
    <input type="checkbox" id="Family" value="19" v-model="genre">
    <label for="Family">Family</label>
    <input type="checkbox" id="Board Games" value="28" v-model="genre">
    <label for="Board Games">Board Games</label>
    <input type="checkbox" id="Educational" value="34" v-model="genre">
    <label for="Educational">Educational</label>
    <input type="checkbox" id="Casual" value="40" v-model="genre">
    <label for="Casual">Casual</label>
    <input type="checkbox" id="Indie" value="51" v-model="genre">
    <label for="Indie">Indie</label>
    <input type="checkbox" id="Massively Multiplayer" value="59" v-model="genre">
    <label for="Massively Multiplayer">Massively Multiplayer</label>
    <input type="checkbox" id="Platformer" value="83" v-model="genre">
    <label for="Platformer">Platformer</label>
    
    <button @click="refresh()">Refresh</button>

    <div class="liste_jeux">
      
      <div v-for="(game, index) in games" :key="index">
        <div class="jeux">
          <p>{{game.name}}</p>
        </div>
      </div>
    </div>
    <button @click="loadMoreGames()">view more</button>
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
  methods: {
    async loadMoreGames(){
      axios
        .get(this.next)
        .then( response => {
          this.games = this.games.concat(response.data.results);
          this.next = response.data.next;
        }) 
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
.liste_jeux{
  justify-content: center;
  display: flex;
  flex-wrap: wrap;
}
.jeux{
  height: 100px;
  width: 300px;
  margin: 20px;
  background-color: grey;
}

input{
  margin-left: 20px;
}
</style>
