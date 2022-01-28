<template>
  <div id="app">
    <div class="nav">
      <input type="checkbox" id="nav-check" />
      <div class="nav-header">
        <div class="nav-title">
          <router-link :to="{ name: 'home' }">Pokedex</router-link>
        </div>
      </div>
      <div class="nav-btn">
        <label for="nav-check">
          <span></span>
          <span></span>
          <span></span>
        </label>
      </div>

      <div class="nav-links">
        <router-link :to="{ name: 'home' }">Home</router-link>
        <router-link :to="{ name: 'favorite-list' }">Favorite</router-link>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<style lang="scss">
@import url("https://use.fontawesome.com/releases/v5.8.2/css/all.css");

body {
  margin: 0;
  padding: 0;
}

* {
  box-sizing: border-box;
  font-family: "Mochiy Pop P One", arial;
}

.nav {
  height: 100%;
  width: 100%;
  background-color: #4d4d4d;
  position: relative;
}

.nav > .nav-header {
  display: inline;
}
a {
  color: #fff !important;
  text-decoration: none !important;
}

.nav > .nav-header > .nav-title {
  display: inline-block;
  font-size: 22px;
  padding: 10px 10px 10px 10px;
  color: #fff !important;
  text-decoration: none !important;
}

.nav > .nav-btn {
  display: none;
}

.nav > .nav-links {
  display: inline;
  float: right;
  font-size: 18px;
}

.nav > .nav-links > a {
  display: inline-block;
  padding: 13px 10px 13px 10px;
  text-decoration: none;
  color: #efefef;
}

.nav > .nav-links > a:hover {
  background-color: rgba(0, 0, 0, 0.3);
}

.nav > #nav-check {
  display: none;
}

@media (max-width: 600px) {
  .nav > .nav-btn {
    display: inline-block;
    position: absolute;
    right: 0px;
    top: 0px;
  }
  .nav > .nav-btn > label {
    display: inline-block;
    width: 50px;
    height: 50px;
    padding: 13px;
  }
  .nav > .nav-btn > label:hover,
  .nav #nav-check:checked ~ .nav-btn > label {
    background-color: rgba(0, 0, 0, 0.3);
  }
  .nav > .nav-btn > label > span {
    display: block;
    width: 25px;
    height: 10px;
    border-top: 2px solid #eee;
  }
  .nav > .nav-links {
    position: absolute;
    display: block;
    width: 100%;
    background-color: #333;
    height: 0px;
    transition: all 0.3s ease-in;
    overflow-y: hidden;
    top: 50px;
    left: 0px;
  }
  .nav > .nav-links > a {
    display: block;
    width: 100%;
  }
  .nav > #nav-check:not(:checked) ~ .nav-links {
    height: 0px;
  }
  .nav > #nav-check:checked ~ .nav-links {
    height: calc(100vh - 50px);
    overflow-y: auto;
  }
}
</style>
