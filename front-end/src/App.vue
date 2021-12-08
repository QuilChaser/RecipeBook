<template>
  <div id="app">
    <div id="title">Chad's Recipes</div>
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/reviews">Reviews</router-link> |
      <router-link to="/recipes">Add Recipe</router-link>
    </div>
    <router-view />
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

#title {
  font-size: 3rem;
  margin-top: 2rem;
}

body {
  width: 100%;
  padding: 0;
  margin: 0;
}

footer {
  background: #eeeeee;
  width: 100%;
  padding: 1rem;
  margin-top: 1rem;
  text-align: center;
}
footer p {
  margin: 0;
  padding: .25rem 0;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  font-size: 1rem;
}

</style>
