<template>
<div class="home">
  <!-- <h1>My Recipe Book:</h1> -->
  <section class="recipeBook">
    <div class="recipe" v-for="item in recipeSearch" :key="item.id">
      <h2>{{item.title}}</h2>
      <img :src="item.path" />
      <h3>Ingredients:</h3>
      <p>{{item.ingred}}</p>
      <h3>Directions:</h3>
      <p>{{item.instr}}</p>
      <hr />
    </div>
  </section>
</div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios';
export default {
  name: 'Home',
  data() {
    return {
      items: [],
    }
  },
  created() {
    this.getItems();
  },
  computed: {
    recipeSearch() {
      return this.items;
    }
  },
  methods: {
    async getItems() {
      try {
        console.log("Getting Items");
        let response = await axios.get("/api/recipes");
        this.items = response.data;
        return true;
      } catch (error) {
        console.log(error);
      }
    },
  }
}
</script>

<style scoped>
.recipe h2 {
  font-style: italic;
  text-align: center;
}

.recipe p {
  font-size: .8rem;
}

/* Masonry */
*,
*:before,
*:after {
  box-sizing: inherit;
}

.recipeBook {
  column-gap: 1.5em;
  margin: auto;
  width: 90%;
}

.recipe {
  margin: 0 0 1.5em;
  display: inline-block;
  width: 100%;
  white-space: pre-wrap;
  text-align: left;
}

.recipe img {
  width: 100%;
}

/* Masonry on large screens */
@media only screen and (min-width: 1024px) {
  .recipeBook {
    column-count: 4;
  }
}

/* Masonry on medium-sized screens */
@media only screen and (max-width: 1023px) and (min-width: 768px) {
  .recipeBook {
    column-count: 3;
  }
}

/* Masonry on small screens */
@media only screen and (max-width: 767px) and (min-width: 540px) {
  .recipeBook {
    column-count: 2;
  }
}
</style>
