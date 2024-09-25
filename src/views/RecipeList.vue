<template>
  <div>
    <nav class="bg-slate-600">
      <div class="flex justify-between p-4 w-full">
        <span class="text-white text-xl font-bold">Recipe Manager</span>
        <div class="flex gap-2 items-center">
          <router-link
            to="/add"
            class="add-button text-white border px-3 rounded"
          >
            <i class="fas fa-plus"></i> Add Recipe
          </router-link>
          <input
            type="text"
            v-model="searchTerm"
            placeholder="Search recipes..."
            class="search-bar !mb-0 rounded"
          />
          <select v-model="selectedDifficulty" class="rounded px-2">
            <option value="">All Difficulties</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>
      </div>
    </nav>

    <div class="p-6">
      <span class="text-base font-semibold">Recipe List</span>
      <ul class="flex flex-col gap-2 mt-6">
        <li
          v-for="recipe in filteredRecipes"
          :key="recipe.id"
          class="p-4 border rounded"
        >
          <div class="flex justify-between">
            <div class="flex flex-col gap-2">
              <div class="flex gap-2">
                <span>Title:</span>
                <span>{{ recipe.title }}</span>
              </div>
              <div class="flex flex-col">
                <span>Ingredients:</span>
                <div
                  v-for="(item, index) in recipe.ingredients"
                  :key="index"
                  class="flex gap-2 pl-4"
                >
                  <div class="flex gap-2">
                    <span>{{ index + 1 + "." }}</span>
                    <span class="">{{ item.name }}</span>
                    <span class="">{{ item.quantity }}</span>
                  </div>
                </div>
              </div>
              <div class="flex flex-col">
                <span>Cooking Steps:</span>
                <div
                  v-for="(item, index) in recipe.steps"
                  :key="index"
                  class="flex flex-col pl-4"
                >
                  <div class="flex gap-2">
                    <span>{{ index + 1 + "." }}</span>
                    <span>{{ item.description }}</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="flex gap-4 items-center">
              <p>Difficulty: {{ recipe.difficulty }}</p>
              <button @click="editRecipe(recipe)">
                <i class="fa fa-edit"></i>
              </button>
              <button @click="deleteRecipe(recipe)">
                <i class="fa fa-trash"></i>
              </button>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, computed } from "vue";
import { useRecipeStore } from "../stores";
import { useRouter } from "vue-router";
const recipeStore = useRecipeStore();
const router = useRouter();
const searchTerm = ref("");
const selectedDifficulty = ref("");

const filteredRecipes = computed(() => {
  return recipeStore.recipes.filter((recipe: IRecipe) => {
    const matchesSearch = recipe.title
      ?.toLowerCase()
      .includes(searchTerm.value.toLowerCase());
    const matchesDifficulty = selectedDifficulty.value
      ? recipe.difficulty === selectedDifficulty.value
      : true;
    return matchesSearch && matchesDifficulty;
  });
});

const editRecipe = (recipe: IRecipe) => {
  router.push({ name: "EditForm", params: { id: recipe.id } });
};

const deleteRecipe = (rec: IRecipe) => {
  recipeStore.recipes = recipeStore.recipes.filter(
    (recipe) => recipe.id !== rec.id
  );
};
</script>

<style>
.search-bar {
  margin-bottom: 1em;
  padding: 0.5em;
}
nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
