<template>
  <div>
    <div class="all">
      <div class="left">
        <h1>{{game.name}}</h1>
        <div class="carousel">
          <div v-if="videoOrImage">
            <img class="currentscreenshot" v-bind:src="screenshots[currentscreenshot].image" alt="">
          </div>
          <div v-else>
            <video autoplay muted loop class="currentscreenshot" id="video" controls >
              <source v-bind:src="videos[currentvideo].data.max" type="video/mp4">
            </video>
          </div>
          <div class="selectscreenshot">
            <div class="displayvideos">
              <div v-for="(video, i) in videos" :key="i">
                <div class="containersvg">
                  <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="play" class="svg-inline--fa fa-play fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M424.4 214.7L72.4 6.6C43.8-10.3 0 6.1 0 47.9V464c0 37.5 40.7 60.1 72.4 41.3l352-208c31.4-18.5 31.5-64.1 0-82.6z"></path></svg>
                  <img class="screenshot" v-bind:src="video.preview" alt="" @click="changevideo(i)">
                </div>
              </div>
            </div>
            <div class="screenshots">
              <div  v-for="(screenshot, index) in screenshots" :key="index">
                <img v-if="screenshot!=null" class="screenshot image" v-bind:src="screenshot.image" alt="" @click="changescreenshot(index)">
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="right">
        <div class="containerright">
          <div class="opacitybackground"></div>
          <img class="background" v-bind:src="game.background_image" alt="">
          <div class="displayallinfo">
            <h1>{{game.name}}</h1>
            <div class="description">{{game.description_raw}}</div>
            <div class="info">
              <div class="containerinfo">
                <div>Developers</div>
                <div>{{concatenerGenres(game.developers)}}</div>
              </div>
              <hr />
              <div class="containerinfo">
                <div>Publishers</div>
                <div>{{concatenerGenres(game.publishers)}}</div>
              </div>
              <hr />
              <div class="containerinfo">
                <div>Released</div>
                <div>{{game.released}}</div>
              </div>
              <hr />
              <div class="containerinfo">
                <div>Platforms</div>
                <div>{{concatenerPlatforms(game.platforms)}}</div>
              </div>
              <hr />
              <div class="containerinfo">
                <div>Genres</div>
                <div>{{concatenerGenres(game.genres)}}</div>
              </div>
              <hr />
            </div>
            <p class="price">$ {{game.id%40+15}}</p>
            <div v-if="gameAlreadyInCart() === 0">
              <button class="buttonAdd" @click="addToCart(), refresh()">Add to cart</button>
            </div>
            <div v-else>
              <button class="buttonAdd" @click="rmvFromCart(), refresh()">Remove from cart</button>
            </div>
          </div>
        </div>
      </div>
    </div>
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
      game:'',
      screenshots: [],
      currentscreenshot:0,
      videos:[],
      currentvideo: 0,
      videoOrImage:true,//false = video / true = image
    };
  },
  watch: {
    currentvideo: function(){
      document.getElementById("video").load();
    },
  },
  methods: {
    addToCart(){
      this.$emit('addGameCart', this.game)
    },
    rmvFromCart(){
      this.$emit('rmvGameCart', this.game)
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
    concatenerPlatforms(platforms){
      if(platforms[0]==null)
        return '';
      var str='';
      for (let index = 0; index < platforms.length; index++) {
        if(platforms[index].platform.name == "PlayStation 5")
          str += ', PS5';
        else if(platforms[index].platform.name == "PlayStation 4")
          str += ', PS4';
        else if(platforms[index].platform.name == "Xbox Series S/X")
          str += ', XBOX X';
        else if(platforms[index].platform.name == "PC")
          str += ', PC';
      }
      str = str.substring(1);
      return str;
    },
    changescreenshot(index){
      if(!this.videoOrImage)
        this.videoOrImage = true;
      this.currentscreenshot = index;
    },
    changevideo(index){
      if(this.videoOrImage)
        this.videoOrImage = false;
      this.currentvideo = index;
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
    refresh(){
      if(this.videos.length ===0)
        this.changescreenshot(this.currentscreenshot)
    }
  },
  async mounted() {
    await axios
      .get('https://api.rawg.io/api/games/'+this.$route.params.id+'?key=8f64c448bc4e47458360ccd1213d4d1c&platforms=4,18,186,187')
      .then( response => {
        response.data.amount=0;
        this.game = response.data;
      })
    await axios
      .get('https://api.rawg.io/api/games/'+this.$route.params.id+'/screenshots?key=8f64c448bc4e47458360ccd1213d4d1c')
      .then( response => {
        this.screenshots = response.data.results;
      })
    await axios
      .get('https://api.rawg.io/api/games/'+this.$route.params.id+'/movies?key=8f64c448bc4e47458360ccd1213d4d1c')
      .then( response => {
        this.videos = response.data.results;
      })
      if(this.videos != null)
        this.videoOrImage = false;
  }
};
</script>

<style scoped>
.containersvg{
  position: relative;
  opacity: .7;
}

.containersvg:hover{
  opacity: 1;
  cursor: pointer;
}

svg{
  position: absolute;
  width: 20px;
  right: 50%;
  top: 50%;
  transform: translate(0,-50%);
}
.all{
  display: flex;
  align-items: center;
  padding-right: 10%;
  padding-left: 10%;
  justify-content: space-between;
  height: 80vh;
}

.left{
  width: 50%;
}

.right{
  width: 30%;
  height: 75vh;
  position: relative;
}

.background{
  width: 100%;
  height: 100%;
  position:absolute;
  top:0;
  left:0;
  background-size: cover;
  object-fit: cover;
  z-index: -2;
  border-radius: 10px;
}

.opacitybackground{
  position:absolute;
  top:0;
  left:0;
  width: 100%;
  height: 100%;
  background-color: black;
  opacity: .7;
  z-index: -1;
  border-radius: 10px;
}

.carousel{
  display: flex;
  flex-direction:column;
  align-items: center;
}

.selectscreenshot{
  margin-top: 20px;
  width: 100%;
  display: flex;
  overflow: hidden;
  overflow-x: auto;
}

.selectscreenshot::-webkit-scrollbar {
    height: 10px;
    background-color: rgba(0, 0, 0, 0.267);
    border-radius: 20px;
}
.selectscreenshot::-webkit-scrollbar-thumb {
  background-color: black;
  border-radius: 20px;
}

.screenshots{
  display: flex;
  flex-direction: row;
}

.screenshot{
  width: 128px;
  height: 72px;
  margin-right: 20px;
  border-radius: 5px;
}

.image{
  cursor: pointer;
  opacity: .7;
}

.image:hover{
  cursor: pointer;
  opacity: 1;
}

.currentscreenshot{
  width: 960px;
  height: 540px;
}

.video{
  width: 500px;
  height: 500px;
}

.displayvideos{
  display: flex;
}

.description{
  font-size: .8em;
  text-align: justify;
}

.containerinfo{
  display: flex;
  justify-content: space-between;
}

.containerright{
  padding-left: 10%;
  padding-right: 10%;
  height: 100%;
}



.buttonAdd {
  margin-left: auto;
  margin-right: auto;
  width: 200px;
  height: 40px;
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
  outline: none;
  padding: 5px 5px;
  text-align: center;
  text-decoration: none;
  transition: all 300ms cubic-bezier(.23, 1, 0.32, 1);
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  will-change: transform;
}

.buttonAdd:disabled {
  pointer-events: none;
}

.buttonAdd:hover {
  color: #fff;
  background-color: #FF6400;
  box-shadow: rgba(0, 0, 0, 0.25) 0 8px 15px;
  transform: translateY(-2px);
}

.buttonAdd:active {
  box-shadow: none;
  transform: translateY(0);
}

hr{
  opacity: .2;
}

.description{
  max-height: 200px;
  overflow: hidden;
  overflow-y: auto;
  
}


.description::-webkit-scrollbar {
  width: 10px;
  background-color: rgba(0, 0, 0, 0.267);
  border-radius: 20px;
}
.description::-webkit-scrollbar-thumb {
  background-color: black;
  border-radius: 20px;
}

.displayallinfo{
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 100%;
}

.price{
  margin: 0;
  padding-bottom: 10px;
  font-size: 1.2em;
  font-weight: 900;
}
</style>