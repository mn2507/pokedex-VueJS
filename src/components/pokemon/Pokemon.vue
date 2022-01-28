<template>
  <div class="container">
    <h1>Pokedex</h1>
    <PokemonSearch :apiUrl="apiUrl" @setPokemonUrl="setPokemonUrl" />
    <PokemonList
      :imageUrl="imageUrl"
      :apiUrl="apiUrl"
      @setPokemonUrl="setPokemonUrl"
      :refreshDataList="refreshDataList"
      :id="id"
      :type="type"
    />
    <PokemonDetail
      v-if="showDetail"
      :pokemonUrl="pokemonUrl"
      :imageUrl="imageUrl"
      @closeDetail="closeDetail"
      v-on:refetchFav="refetchFav"
      @previousDetail="previousDetail($event)"
      @nextDetail="nextDetail($event)"
    />
  </div>
</template>

<script>
import PokemonSearch from "./pokemon-search/PokemonSearch.vue";
import PokemonList from "./pokemon-list/PokemonList.vue";
import PokemonDetail from "./pokemon-detail/PokemonDetail.vue";

export default {
  data: () => {
    return {
      imageUrl: "https://cdn.traction.one/pokedex/pokemon/",
      apiUrl: "https://pokeapi.co/api/v2/pokemon/",
      pokemonUrl: "",
      showDetail: false,
      favoriteList: [],
      refreshDataList: false,
      id: null,
      type: "",
    };
  },
  components: {
    PokemonSearch,
    PokemonList,
    PokemonDetail,
  },
  methods: {
    setPokemonUrl(url) {
      this.pokemonUrl = url;
      this.showDetail = true;
    },
    closeDetail() {
      this.pokemonUrl = "";
      this.showDetail = false;
    },
    refetchFav() {
      this.refreshDataList = !this.refreshDataList;
      this.showDetail = false;
    },
    previousDetail(data) {
      this.id = data;
      this.type = "previous";
      this.refreshDataList = !this.refreshDataList;
    },
    nextDetail(data) {
      this.id = data;
      this.type = "next";
      this.refreshDataList = !this.refreshDataList;
    },
  },
  mounted() {
    if (!localStorage.getItem("favoriteList")) {
      localStorage.setItem("favoriteList", JSON.stringify(this.favoriteList));
    }
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
</style>
