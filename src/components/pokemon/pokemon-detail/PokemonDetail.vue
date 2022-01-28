<template>
  <div class="detail">
    <div class="detail-view" v-if="show">
      <div v-if="pokemon" class="image">
        <img
          :src="imageUrl + pokemon.id + '.png'"
          width="96"
          height="96"
          alt=""
        />
      </div>
      <div v-if="pokemon" class="data">
        <h2>
          {{ pokemon.name }}
          <span
            v-if="isFavorite"
            class="favorite-badge"
            @click="removeTofavorite"
          >
            Remove from favorite
          </span>
          <span v-else class="favorite-badge" @click="addTofavorite">
            Add to favorite
          </span>
        </h2>
        <div class="property">
          <div class="left">Base Experience</div>
          <div class="right">{{ pokemon.base_experience }} XP</div>
        </div>
        <div class="property">
          <div class="left">Height</div>
          <div class="right">{{ pokemon.height / 10 }} m</div>
        </div>
        <div class="property">
          <div class="left">Weight</div>
          <div class="right">{{ pokemon.weight / 10 }} kg</div>
        </div>
        <h3>Pokemon Types</h3>
        <div class="types">
          <div
            class="type"
            v-for="(value, index) in pokemon.types"
            :key="'value' + index"
          >
            {{ value.type.name }}
          </div>
        </div>
        <h3>Abilities</h3>
        <div class="abilities">
          <div
            class="ability"
            v-for="(value, index) in pokemon.abilities"
            :key="'value' + index"
          >
            {{ value.ability.name }}
          </div>
        </div>
      </div>
      <h2 v-else>The pokemon was not found</h2>
      <div>
        <button
          v-if="pokemon && is_show_next"
          class="previous"
          @click="previousDetail"
        >
          Previous
        </button>
        <button class="close" @click="closeDetail">close</button>
        <button v-if="pokemon && is_show_next" class="next" @click="nextDetail">
          Next
        </button>
      </div>
    </div>
    <i v-else class="fas fa-spinner fa-spin"></i>
  </div>
</template>

<script>
export default {
  props: ["pokemonUrl", "imageUrl"],
  data: () => {
    return {
      show: false,
      pokemon: {},
      isFavorite: false,
      is_show_next: true,
    };
  },
  watch: {
    pokemonUrl: function () {
      this.isFavorite = false;
      this.fetchData();
    },
  },
  methods: {
    fetchData() {
      let req = new Request(this.pokemonUrl);
      fetch(req)
        .then((resp) => {
          if (resp.status === 200) return resp.json();
        })
        .then((data) => {
          if (localStorage.getItem("favoriteList")) {
            let favoriteListLocal = JSON.parse(
              localStorage.getItem("favoriteList")
            );

            if (favoriteListLocal.length > 0) {
              favoriteListLocal.forEach((list) => {
                if (list.id == data.id) {
                  this.isFavorite = true;
                }
              });
            } else {
              this.isFavorite = false;
            }
          }
          this.pokemon = data;
          this.show = true;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    closeDetail() {
      this.$emit("closeDetail");
    },
    previousDetail() {
      this.$emit("previousDetail", this.pokemon.id);
    },
    nextDetail() {
      this.$emit("nextDetail", this.pokemon.id);
    },
    addTofavorite() {
      if (localStorage.getItem("favoriteList")) {
        let favoriteListLocal = JSON.parse(
          localStorage.getItem("favoriteList")
        );
        favoriteListLocal.push(this.pokemon);
        localStorage.setItem("favoriteList", JSON.stringify(favoriteListLocal));
        this.fetchData();
      }
    },
    removeTofavorite() {
      this.isFavorite = false;
      if (localStorage.getItem("favoriteList")) {
        let favoriteListLocal = JSON.parse(
          localStorage.getItem("favoriteList")
        );
        let favIndex = null;

        favoriteListLocal.forEach((list, index) => {
          if (list.id == this.pokemon.id) {
            favIndex = index;
          }
        });
        favoriteListLocal.splice(favIndex, 1);
        localStorage.setItem("favoriteList", JSON.stringify(favoriteListLocal));
        this.fetchData();
        this.$emit("refetchFav");
      }
    },
  },
  created() {
    var currentUrl = window.location.pathname;

    if (currentUrl == "/favorite") {
      this.is_show_next = false;
    }

    this.fetchData();
  },
};
</script>

<style lang="scss" scoped>
.favorite-badge {
  font-size: 9px;
  background: #db0abf;
  padding: 5px;
  border-radius: 6px;
  cursor: pointer;
  color: #fff;
}
.detail {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  position: fixed;
  top: 0;
  left: 0;
  padding: 90px 10px 10px;
  width: 100%;
  height: 100%;
  background: rgba($color: #000000, $alpha: 0.7);

  .detail-view {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    position: relative;
    width: 100%;
    max-width: 510px;
    padding: 50px 0 0;
    background-color: #fff;
    border-radius: 5px;
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2), 0 10px 10px rgba(0, 0, 0, 0.2);

    .image {
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
      top: -60px;
      width: 120px;
      height: 120px;
      background-color: #333;
      border-radius: 50%;
      overflow: hidden;
      box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2), 0 10px 10px rgba(0, 0, 0, 0.2);
    }

    h2 {
      text-transform: capitalize;
    }

    .data {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      flex-direction: column;
      width: 100%;
      margin-bottom: 40px;

      .property {
        width: 90%;
        max-width: 400px;
        border-bottom: 1px solid #ccc;
        margin-bottom: 10px;

        .left {
          float: left;
        }
        .right {
          float: right;
        }
      }

      h3 {
        width: 90%;
        max-width: 400px;
        border-bottom: 1px solid #ccc;
      }

      .types,
      .abilities {
        display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;
        width: 90%;
        max-width: 400px;

        .type,
        .ability {
          margin: 0 10px 10px 0;
          padding: 5px 10px;
          border-radius: 20px;
          color: #fff;
          font-size: 1rem;
          letter-spacing: 2px;
          text-transform: capitalize;
          word-wrap: none;
          word-break: keep-all;
        }

        .type {
          background-color: #0a2e50;
        }
        .ability {
          background-color: #c73015;
        }
      }
    }

    .close {
      outline: none;
      border: none;
      border-radius: 5px;
      background-color: #333;
      color: #efefef;
      padding: 10px 20px;
      margin-bottom: 20px;
      font-size: 1.2rem;
      cursor: pointer;
      margin-right: 15px;
    }

    .next {
      outline: none;
      border: none;
      border-radius: 5px;
      background-color: #28a745;
      color: #efefef;
      padding: 10px 20px;
      margin-bottom: 20px;
      font-size: 1.2rem;
      cursor: pointer;
      margin-right: 15px;
    }
    .previous {
      outline: none;
      border: none;
      border-radius: 5px;
      background-color: #377bff;
      color: #efefef;
      padding: 10px 20px;
      margin-bottom: 20px;
      font-size: 1.2rem;
      cursor: pointer;
      margin-right: 15px;
    }
  }

  i {
    font-size: 2rem;
    color: #efefef;
  }
}
</style>
