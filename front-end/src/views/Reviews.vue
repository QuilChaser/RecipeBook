<template>
<div class="review-container">
  <h1>Reviews:</h1>
  <section class="reviews">
    <div class="review" v-for="item in reviews" :key="item.id">
      <h2>Recipe: {{item.recipe}}</h2>
      <h3>By: {{item.name}}</h3>
      <p>{{item.review}}</p>
      <!-- <button class="editReview" @click="edit(item)">Edit</button> -->
      <button class="delReview" @click="deleteReview(item)">Delete</button>
      <hr />
    </div>
  </section>
  <section class="writeReview">
    <h2>Write a Review:</h2>
    <div class="uploaded" v-if="uploaded">
      <h3>Thanks! Your review was submitted!</h3>
    </div>
    <div class="form" v-else>
      <input v-model="name" placeholder="Your Name"><br />
      <input v-model="recipe" placeholder="Recipe Name">
      <div class="suggestions" v-if="suggestions.length > 0">
        <div class="suggestion" v-for="s in suggestions" :key="s.id" @click="selectRecipe(s)">{{s.title}}
        </div>
      </div>
      <textarea v-model="review" placeholder="Your Review"></textarea><br />
      <button @click="editReview">Update</button>
    </div>
    <!-- <div class="form" v-if="editing">
      <input v-model="name" placeholder="Your Name"><br />
      <input v-model="recipe" placeholder="Recipe Name">
      <div class="suggestions" v-if="suggestions.length > 0">
        <div class="suggestion" v-for="s in suggestions" :key="s.id" @click="selectRecipe(s)">{{s.title}}
        </div>
      </div>
      <textarea v-model="review" placeholder="Your Review"></textarea><br />
      <button @click="upload">Upload</button>
    </div> -->
  </section>
</div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios';
export default {
  name: 'Reviews',
  data() {
    return {
      reviews: [],
      recipes: [],
      name: "",
      recipe: "",
      review: "",
      findRecipe: "",
      uploaded: false,
    }
  },
  created() {
    this.getReviews();
    this.getRecipes();
  },
  computed: {
    suggestions() {
      let recipes = this.recipes.filter(item => item.title.toLowerCase().startsWith(this.recipe.toLowerCase()));
      return recipes.sort((a, b) => a.title > b.title);
    }
  },
  methods: {
    async upload() {
      try {
        let r1 = await axios.post('/api/reviews', {
          name: this.name,
          recipe: this.recipe,
          review: this.review,
        });
        this.addItem = r1.data;
        this.name = "";
        this.recipe = "";
        this.review = "";
        this.findRecipe = "";
        this.uploaded = true;
      } catch (error) {
        console.log(error);
      }
    },
    async deleteReview(item) {
      try {
        await axios.delete('/api/reviews/' + item._id);
        this.findItem = null;
        this.getReviews();
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    // async editReview(item) {
    //   try {
    //     await axios.put('/api/recipes/' + item._id, {
    //       title: this.findItem.title,
    //       ingred: this.findItem.ingred,
    //       instr: this.findItem.instr,
    //     });
    //     this.findItem = null;
    //     this.getItems();
    //     return true;
    //   } catch (error) {
    //     console.log(error);
    //   }
    // },
    async getReviews() {
      try {
        let response = await axios.get("/api/reviews");
        this.reviews = response.data;
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    async getRecipes() {
      try {
        let response = await axios.get("/api/recipes");
        this.recipes = response.data;
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    // edit(item) {
    //   this.editingItem = item;
    //   this.title = item.title;
    //   this.recipe = item.reicpe;
    //   this.review = item.review;
    //   this.editing = true;
    // }
    selectRecipe(item) {
      this.recipe = item.title;
      this.findRecipe = item;
    },
  }
}
</script>

<style scoped>
.review-container {
  width: 80%;
  margin: auto;
}

.review {
  text-align: left;
  white-space: pre-wrap;
}

.review h2,
.review h3 {
  margin: 0;
}

.heading {
  display: flex;
  margin-bottom: 20px;
  margin-top: 20px;
  border-top: black solid;
  padding-top: 1rem;
}

.heading h2 {
  margin-top: 8px;
  margin-left: 10px;
}

/* Form */
input,
textarea,
select,
button {
  font-family: 'Montserrat', sans-serif;
  font-size: 1em;
  width: 100%;
  max-width: 800px;
}

textarea {
  height: 8rem;
}

button {
  border: none;
  border-radius: .5rem;
  padding: .25rem;
  background: #ddd;
  margin: .2rem;
}

button:hover {
  background: #ccc;
  cursor: pointer;
}

button:active {
  background: #bbb;
}

.form {
  text-align: left;
  width: 80%;
  margin: auto;
}

/* Suggestions */
.suggestions {
  width: 100%;
  border: 2px solid #ccc;
  padding: 1px 2px;

}

.suggestion {
  min-height: 20px;
}

.suggestion:hover {
  background-color: #5BDEFF;
  color: #fff;
}
</style>
