import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
Vue.use(Vuex);

const store = new Vuex.Store({
  state() {
    return {
      pockemonList: [],
      filterType: null,
      filterValue: "All",
      sortValue: "Ascending",
      nextUrl: "https://pokeapi.co/api/v2/pokemon/",
      scratchUrl: "https://pokeapi.co/api/v2/pokemon/",
      imageUrl: "https://cdn.traction.one/pokedex/pokemon/",
    };
  },
  mutations: {
    updateNextUrl(state, nextUrl) {
      state.nextUrl = nextUrl;
    },
    updateFilterType(state, data) {
      state.filterType = [];
      state.filterType = data;
    },
    updatePokemonData(state, data) {
      state.pockemonList.push(data);
    },
    filterPokemonData(state) {
      const res = this.state.pockemonList.filter((x) =>
        x.type.some((y) => y === this.state.filterValue)
      );
      this.state.pockemonList = [];
      this.state.pockemonList = res;
    },
    sortPokemonData(state) {
      if (this.state.sortValue == "Descending") {
        this.state.pockemonList = this.state.pockemonList.sort((a, b) => {
          let fa = a.id,
            fb = b.id;
          if (fa > fb) {
            return -1;
          }
          if (fa < fb) {
            return 1;
          }
          return 0;
        });
      } else {
        this.state.pockemonList = this.state.pockemonList.sort((a, b) => {
          let fa = a.id,
            fb = b.id;
          if (fa < fb) {
            return -1;
          }
          if (fa > fb) {
            return 1;
          }
          return 0;
        });
      }
    },
  },
  actions: {
    async getPokemonList({ commit }) {
      await axios.get(this.state.scratchUrl).then((response) => {
        this.state.pockemonList = [];
        commit("updateNextUrl", response.data.next);

        let tempFilterType = [];

        response.data.results.forEach((pokemon) => {
          axios
            .get(pokemon.url)
            .then((pokemonResponse) => {
              pokemonResponse.data.type = [];

              pokemonResponse.data.types.forEach((type) => {
                tempFilterType.push(type.type.name);
                pokemonResponse.data.type.push(type.type.name);
              });

              commit("updatePokemonData", pokemonResponse.data);
            })
            .then(() => {
              tempFilterType = [...new Set(tempFilterType)];
              commit("updateFilterType", tempFilterType);
              commit("sortPokemonData");
            });
        });
      });
    },
    sortPokemonData({ commit }, value) {
      this.state.sortValue = value;
      commit("sortPokemonData", value);
    },
    filterPokemonData({ commit }, value) {
      this.state.filterValue = value;
      commit("filterPokemonData", value);
    },
  },
  getters: {},
});
