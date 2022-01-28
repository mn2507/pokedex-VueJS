<template>
  <div class="container">
    <h1>Pokedex</h1>

    <PokemonDetail
      v-if="showDetail"
      :pokemonUrl="pokemonUrl"
      :imageUrl="imageUrl"
      @closeDetail="closeDetail"
      v-on:refetchFav="refetchFav"
    />

    <div v-if="!showDetail">
      <div class="list" v-if="favList.length > 0">
        <article
          v-for="(pokemon, index) in favList"
          :key="'poke' + index"
          @click="setPokemonUrl(pokemon)"
        >
          {{ pokemon.url }}
          <small class="pockman-id">{{ pokemon.id }}</small>
          <img
            :src="imageUrl + pokemon.id + '.png'"
            width="96"
            height="96"
            alt=""
          />
          <h3>{{ pokemon.name }}</h3>
          <div v-if="pokemon.types.length != 0">
            <small>Types : </small>
            <small v-for="type in pokemon.types" :key="type.id">
              {{ type.type.name }}
            </small>
          </div>
        </article>
      </div>
      <div v-else>
        <h1>You have not any favorite</h1>
      </div>
    </div>
  </div>
</template>

<script>
import PokemonDetail from "../pokemon-detail/PokemonDetail.vue";

export default {
  data: () => {
    return {
      favList: [],
      imageUrl: "https://cdn.traction.one/pokedex/pokemon/",
      apiUrl: "https://pokeapi.co/api/v2/pokemon/",
      pokemonUrl: "",
      showDetail: false,
    };
  },
  components: {
    PokemonDetail,
  },
  methods: {
    setPokemonUrl(data) {
      let url = "https://pokeapi.co/api/v2/pokemon/" + data.id;
      this.pokemonUrl = url;
      this.showDetail = true;
    },
    closeDetail() {
      this.pokemonUrl = "";
      this.showDetail = false;
    },
    fetchFav() {
      if (localStorage.getItem("favoriteList")) {
        this.favList = JSON.parse(localStorage.getItem("favoriteList"));
      }
    },
    refetchFav() {
      this.fetchFav();
    },
  },
  mounted() {
    this.fetchFav();
  },
};
</script>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Mochiy+Pop+P+One&display=swap");

.container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 10px;
  width: 100%;
  min-height: calc(100vh - 20px);
  background: radial-gradient(#db0abf, #e05118);

  font-family: "Mochiy Pop P One", arial;
  font-size: 1rem;
  font-weight: normal;
}

h1 {
  color: #efefef;
}

.fav-ico {
  position: absolute;
  top: 8%;
  left: 7%;
}
.filter {
  float: right;
  display: block !important;
  margin-bottom: 10px;
}
.pockman-id {
  position: absolute;
  top: 7%;
  left: 83%;
}
.list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  grid-gap: 10px;
  width: 100%;
  max-width: 510px;

  article {
    position: relative;
    height: 150px;
    background-color: #efefef;
    text-align: center;
    text-transform: capitalize;
    border-radius: 5px;
    cursor: pointer;
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2), 0 10px 10px rgba(0, 0, 0, 0.2);

    h3 {
      margin: 0;
    }
  }
}

#scroll-trigger {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 150px;
  font-size: 2rem;
  color: #efefef;
}
</style>
