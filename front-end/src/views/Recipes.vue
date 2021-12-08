<template>
<div class="recipes">
  <h1>Add A Recipe</h1>
  <h3>Add One of your favorite Recipe's to the Cookbook!</h3>
  <div class="recipeCreation">
    <div class="heading">
      <div class="circle">1</div>
      <h2>Add an Item</h2>
    </div>
    <div id="add">
      <div class="form">
        <input v-model="title" placeholder="Title"><br />
        <textarea v-model="ingred" placeholder="Ingredients"></textarea><br />
        <textarea v-model="instr" placeholder="Instructions"></textarea>
        <p></p>
        <input type="file" name="photo" @change="fileChanged"><br />
        <button @click="upload">Upload</button>
      </div>
      <div class="upload" v-if="addItem">
        <h2>{{addItem.title}}</h2>
        <img :src="addItem.path" />
        <h3>Ingredients</h3>
        <p>{{addItem.ingred}}</p>
        <h3>Instructions</h3>
        <p>{{addItem.instr}}</p>
      </div>
    </div>
    <div class="heading">
      <div class="circle">2</div>
      <h2>Edit/Delete a recipe</h2>
    </div>
    <div id="edit">
      <div class="form form-edit">
        <input v-model="findTitle" placeholder="Search">
        <div class="suggestions" v-if="suggestions.length > 0">
          <div class="suggestion" v-for="s in suggestions" :key="s.id" @click="selectItem(s)">{{s.title}}
          </div>
        </div>
      </div>
      <div class="upload-edit" v-if="findItem">
        <input v-model="findItem.title"><br />
        <img :src="findItem.path" />
        <textarea v-model="findItem.ingred"></textarea>
        <textarea v-model="findItem.instr"></textarea>
      </div>
      <div class="actions" v-if="findItem">
        <button @click="deleteItem(findItem)">Delete</button><br />
        <button @click="editItem(findItem)">Edit</button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'Recipes',
  data() {
    return {
      title: "",
      ingred: "",
      instr: "",
      file: null,
      addItem: null,
      items: [],
      findTitle: "",
      findItem: null,
    }
  },
  computed: {
    suggestions() {
      let items = this.items.filter(item => item.title.toLowerCase().startsWith(this.findTitle.toLowerCase()));
      return items.sort((a, b) => a.title > b.title);
    }
  },
  methods: {
    fileChanged(event) {
      this.file = event.target.files[0]
    },
    async upload() {
      try {
        const formData = new FormData();
        if (this.file != null) {
          formData.append('photo', this.file, this.file.name)
          let r1 = await axios.post('/api/photos', formData);
          let r2 = await axios.post('/api/recipes', {
            title: this.title,
            ingred: this.ingred,
            instr: this.instr,
            path: r1.data.path
          });
          this.addItem = r2.data;
        } else {
          let r2 = await axios.post('/api/recipes', {
            title: this.title,
            ingred: this.ingred,
            instr: this.instr,
            path: "/images/default.png",
          });
          this.addItem = r2.data;
        }
      } catch (error) {
        console.log(error);
      }
    },
    async getItems() {
      try {
        let response = await axios.get('/api/recipes');
        this.items = response.data;
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    async deleteItem(item) {
      try {
        await axios.delete('/api/recipes/' + item._id);
        this.findItem = null;
        this.getItems();
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    async editItem(item) {
      try {
        await axios.put('/api/recipes/' + item._id, {
          title: this.findItem.title,
          ingred: this.findItem.ingred,
          instr: this.findItem.instr,
        });
        this.findItem = null;
        this.getItems();
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    selectItem(item) {
      this.findTitle = "";
      this.findItem = item;
    },
  },
  created() {
    this.getItems();
  },
}
</script>

<style scoped>
.recipeCreation {
  width: 80%;
  margin: auto;
}

.image h2 {
  font-style: italic;
  font-size: 1em;
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

#add,
#edit {
  display: flex;
}

.circle {
  border-radius: 50%;
  width: 18px;
  height: 18px;
  padding: 8px;
  background: #333;
  color: #fff;
  text-align: center
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

/* button {
  border: none;
  border-radius: .5rem;
  padding: .25rem;
  background: #ddd;
  margin: .2rem;
} */

button:hover {
  background: #ccc;
  cursor: pointer;
}

button:active {
  background: #bbb;
}

.form {
  text-align: left;
  width: 45%;
  padding: 0 2%;
}

#add .upload {
  width: 50%;
  white-space: pre-wrap;
  text-align: left;
  padding-left: 4%;
}

.form-edit {
  padding-top: 1rem;
}

.upload-edit,
.actions {
  padding: 1rem;
  text-align: left !important;
}

/* Uploaded images */
.upload h2 {
  margin: 0px;
}

.upload img,
.upload-edit img {
  max-width: 300px;
  padding-top: .4rem;
}

.upload .upload-edit {
  width: 50%;
  white-space: pre-wrap;
  margin-left: 2%;
  text-align: left !important;
}

/* Suggestions */
.suggestions {
  width: 200px;
  border: 1px solid #ccc;
}

.suggestion {
  min-height: 20px;
}

.suggestion:hover {
  background-color: #5BDEFF;
  color: #fff;
}

/* Masonry on small screens */
@media only screen and (max-width: 767px) {

  #add,
  #edit {
    display: block;
  }

  #add .upload,
  #add .form {
    width: 100%;
  }

  #add .upload {
    padding-top: 2rem;
  }

  #edit .form,
  #edit .upload-edit,
  .actions {
    width: 100%;
    padding-left: 0;
    padding-right: 0;
  }
}
</style>
