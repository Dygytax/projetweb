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

      <select v-model="order">
        <option disabled value="">Order By:</option>
        <option value="name">Name</option>
        <option value="released">Released</option>
        <option value="rating">Rating</option>
      </select>

      <div>
        <input type="checkbox" id="Racing" value="1" v-model="genre">
        <label for="Racing">Racing</label>
      </div>
      <div>
        <input type="checkbox" id="Shooter" value="2" v-model="genre">
        <label for="Shooter">Shooter</label>
      </div>
      <div>
      <input type="checkbox" id="Adventure" value="3" v-model="genre">
      <label for="Adventure">Adventure</label>
      </div>
      <div>
      <input type="checkbox" id="Action" value="4" v-model="genre">
      <label for="Action">Action</label>
      </div>
      <div>
      <input type="checkbox" id="RPG" value="5" v-model="genre">
      <label for="RPG">RPG</label>
      </div>
      <div>
      <input type="checkbox" id="Fighting" value="6" v-model="genre">
      <label for="Fighting">Fighting</label>
      </div>
      <div>
      <input type="checkbox" id="Strategy" value="10" v-model="genre">
      <label for="Strategy">Strategy</label>
      </div>
      <div>
      <input type="checkbox" id="Arcade" value="11" v-model="genre">
      <label for="Arcade">Arcade</label>
      </div>
      <div>
      <input type="checkbox" id="Simulation" value="14" v-model="genre">
      <label for="Simulation">Simulation</label>
      <input type="checkbox" id="Sports" value="15" v-model="genre">
      <label for="Sports">Sports</label>
      </div>
      <div>
      <input type="checkbox" id="Card" value="17" v-model="genre">
      <label for="Card">Card</label>
      </div>
      <div>
      <input type="checkbox" id="Family" value="19" v-model="genre">
      <label for="Family">Family</label>
      </div>
      <div>
      <input type="checkbox" id="Board Games" value="28" v-model="genre">
      <label for="Board Games">Board Games</label>
      </div>
      <div>
      <input type="checkbox" id="Educational" value="34" v-model="genre">
      <label for="Educational">Educational</label>
      </div>
      <div>
      <input type="checkbox" id="Casual" value="40" v-model="genre">
      <label for="Casual">Casual</label>
      </div>
      <div>
      <input type="checkbox" id="Indie" value="51" v-model="genre">
      <label for="Indie">Indie</label>
      </div>
      <div>
      <input type="checkbox" id="Massively Multiplayer" value="59" v-model="genre">
      <label for="Massively Multiplayer">Massively Multiplayer</label>
      </div>
      <div>
      <input type="checkbox" id="Platformer" value="83" v-model="genre">
      <label for="Platformer">Platformer</label>
      </div>
      
      <button @click="refresh()">Refresh</button>
    </div>

    <div class="right">
      <h1>Games</h1>
      <div class="liste_jeux">
        <div v-for="(game, index) in games" :key="index">
          <div class="jeux" @click="$router.push('/game/' + game.id)">
            <p>{{game.name}}</p>
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
  methods: {
    async loadMoreGames(){
      axios
        .get(this.next)
        .then( response => {
          this.games = this.games.concat(response.data.results);
          this.next = response.data.next;
        }) 
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
  height: 380px;
  position: relative;
  display: flex;
  flex-flow: column;
  overflow: hidden;
  border-radius: 10px;
  background: #2c2e32;
  cursor: pointer;
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
}

input{
  margin-left: 20px;
}
</style>
