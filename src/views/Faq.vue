<template>
  <div class="container">
    <h1>Questions fréquentes</h1>
    <p class="text text-main">
      Ici vous pourrez voir les différentes questions que l'on nous posent
      fréquemmment.<br />
    </p>

    <div
      v-for="element in listeQuestion"
      :key="element.title"
      v-on:click="element.show = !element.show"
      class="block"
    >
      <div class="row">
        <p class="titre2">
          {{ element.title }}
        </p>
        <div :class="['button', element.show ? 'show' : '']">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            viewBox="0 0 24 24"
          >
            <path
              d="M0 16.67l2.829 2.83 9.175-9.339 9.167 9.339 2.829-2.83-11.996-12.17z"
            />
          </svg>
        </div>        
      </div>
      <transition name="fade">
        <p v-if="element.show" class="description">{{ element.description }}</p>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      listeQuestion: [
        {
          title: "Comment ça marche ?",
          description:
            "Tout se passe dans la première page E-Shop. Ici l'utilisateur peut voir les différents jeux présents dans notre API, consulter les jeux en détail ou bien les ajouter à son panier. De plus, lorsqu'il consulte en détail les jeux, l'utilisateur peut voir des screenshots du jeu, des vidéos du jeu ainsi que les genres associés au jeu qu'il cherche.",
          show: false,
        },
        {
          title: "Quel est le but de notre application ?",
          description:
            "Le but de notre site web est de permettre à nos utilisateurs de s'informer sur les différents jeux vidéos présentés mais aussi de pouvoir les ajouter à leurs paniers afin de les acheter directement sur notre site. Le site que nous proposons est une alternative aux sites de vente de jeux vidéos classiques car nous disposons de plus d'informations sur les jeux et cela permet à l'utilisateur d'être mieux informé ",
          show: false,
        },
        {
          title: "Pourquoi nous ?",
          description:
            "Nous choisir serait la meilleure option pour vous. En effet, le site que nous vous proposons est simple d'accès, simple d'utilité et permet à nos utilisateurs de s'informer beaucoup plus sur les jeux qu'ils veulent consulter par rapport aux autres sites de vente classique. De plus, dans notre site, nous proposons à nos utilisateurs des jeux moins connus du grand public ainsi que des jeux indépendants. .",
          show: false,
        },
      ],
    };
  },
};
</script>

<style scoped>
.block .header{
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

h1 {
  margin-top: 50px;
}

.button.show {
  transform: rotate(0);
  transition: 1s;
}

.container {

  display: flex;
  flex-direction: column;
}

.block {
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  margin: 8px auto 7px auto;
  padding: 1em;
  display: flex;
  justify-content: space-between;
  flex-wrap: nowrap;
  width: 40%;
  min-width: 320px;
  max-width: 40%;
  height: auto;
  background-color: white;
  cursor: pointer;
  user-select: none;
  flex-direction: column;
}

.text {
  margin: 1% 5% 6% 5%;
}

.row{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.titre2 {
  color:black;
  align-self: left;
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 37px;
  text-align: left;
  transition: 0.5s;
  margin-top: 10px;
  margin-bottom: 10px;
}

.button {
  width: 20px;
  height: 20px;
  min-width: 20px;
  min-height: 20px;
  cursor: pointer;
  border-radius: 50%;
  transform: rotate(180deg);
  border: 1px solid;
  border-color: grey;
  background-color: white;
  transition: 1s;
}
svg {
  width: 12px;
  height: 12px;
  position: absolute;
  transform: translateX(-50%) translateY(30%);
}

.description {
  text-align: left;
  user-select: text;
  color: black;
}

.fade-enter-active {
  transition: opacity 0.5s;
}

.fade-enter {
  opacity: 0;
}
</style>
