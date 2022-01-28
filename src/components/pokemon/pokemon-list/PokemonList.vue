<template>
  <div>
    <div class="filter">
      <label for="">Sort : </label>
      <select v-model="sortValue" @change="sortData" style="margin-right: 20px">
        <option value="Ascending">Ascending</option>
        <option value="Descending">Descending</option>
      </select>

      <label for="">Filter : </label>
      <select v-model="filterValue" @change="filterData">
        <option value="All" selected>All</option>
        <option
          :value="filter"
          v-for="filter in filterType"
          :key="filter.index"
        >
          {{ filter }}
        </option>
      </select>
    </div>
    <br />

    <div class="list">
      <article
        v-for="(pokemon, index) in pokemons"
        :key="'poke' + index"
        @click="setPokemonUrl(pokemon.url)"
      >
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
      <div id="scroll-trigger" ref="infinitescrolltrigger">
        <!-- <i class="fas fa-spinner fa-spin"></i> -->
        <button @click="scrollTrigger">Load More</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["imageUrl", "apiUrl", "refreshDataList", "type", "id"],
  data: () => {
    return {
      pokemons: [],
      filterType: [],
      nextUrl: "",
      currentUrl: "",
      filterValue: "All",
      sortValue: "Ascending",
      favoriteListLocal: [],
    };
  },
  watch: {
    refreshDataList: function () {
      this.changePockmon();
    },
  },
  methods: {
    fetchData() {
      let req = new Request(this.currentUrl);
      fetch(req)
        .then((resp) => {
          if (resp.status === 200) return resp.json();
        })
        .then((data) => {
          this.nextUrl = data.next;
          data.results.forEach((pokemon) => {
            fetch(pokemon.url)
              .then((resp) => {
                if (resp.status === 200) return resp.json();
              })
              .then((data) => {
                data.url = this.currentUrl + data.id;
                data.favorite = false;
                data.type = [];

                data.types.forEach((type) => {
                  this.filterType.push(type.type.name);
                  data.type.push(type.type.name);
                });

                if (this.favoriteListLocal.length > 0) {
                  this.favoriteListLocal.forEach((item) => {
                    if (item.id == data.id) {
                      data.favorite = true;
                    } else {
                      data.favorite = false;
                    }
                  });
                }

                this.pokemons.push(data);
              })
              .then(() => {
                this.sortData();
                this.filterType = [...new Set(this.filterType)];
              })
              .catch((error) => {
                console.log(error);
              });
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    scrollTrigger() {
      this.next();
    },
    next() {
      this.currentUrl = this.nextUrl;
      this.fetchData();
    },
    setPokemonUrl(url) {
      this.$emit("setPokemonUrl", url);
    },
    filterData() {
      if (this.filterValue == "All") {
        this.pokemons = [];
        this.fetchData();
      } else {
        let filterTempData = [];

        this.pokemons.forEach((item) => {
          item.type.forEach((type) => {
            if (type == this.filterValue) {
              filterTempData.push(item);
            }
          });
        });
        this.pokemons = filterTempData;
      }
    },
    sortData() {
      if (this.sortValue == "Descending") {
        this.pokemons = this.pokemons.sort((a, b) => {
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
        this.pokemons = this.pokemons.sort((a, b) => {
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
    changePockmon() {
      let itemIndex = null;

      this.pokemons.forEach((item, index) => {
        if (item.id == this.id) {
          itemIndex = index;
        }
      });

      if (this.type == "previous") {
        itemIndex = itemIndex - 1;
        if (itemIndex < 0) {
          itemIndex = 0;
        }
      } else if (this.type == "next") {
        itemIndex = itemIndex + 1;
      }
      this.$emit("setPokemonUrl", this.pokemons[itemIndex].url);
    },
  },
  async created() {
    this.currentUrl = this.apiUrl;
    await this.fetchData();
  },

  mounted() {
    // this.scrollTrigger();

    if (localStorage.getItem("favoriteList")) {
      this.favoriteListLocal = JSON.parse(localStorage.getItem("favoriteList"));
    }
  },
};
</script>

<style lang="scss" scoped>
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
