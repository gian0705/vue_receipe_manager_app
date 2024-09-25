<template>
  <div class="flex flex-col p-8">
    <button @click="goBack" class="w-10">
      <i class="fa fa-arrow-left"></i>
    </button>
    <div class="flex flex-col items-center">
      <span class="text-xl font-bold mb-4">{{
        isEditMode ? "Edit Recipe" : "Add Recipe"
      }}</span>
      <form @submit.prevent="handleSubmit">
        <div class="flex gap-2">
          <label for="title" class="font-semibold">Title:</label>
          <input
            type="text"
            v-model="recipe.title"
            required
            class="border rounded"
          />
        </div>

        <div class="flex flex-col gap-2">
          <label for="ingredients" class="font-semibold">Ingredients:</label>
          <div
            v-for="(ingredient, index) in recipe.ingredients"
            :key="ingredient.id"
          >
            <div class="flex gap-2 justify-between p-4 border">
              <div class="flex gap-2">
                <label class="ingredient-label">
                  {{ ingredient.name }}
                </label>
                <label>
                  {{ ingredient.quantity }}
                </label>
              </div>

              <button
                @click.prevent="removeIngredient(index)"
                class="border px-4 py-2 rounded !mt-0"
              >
                Remove
              </button>
            </div>
          </div>
          <div class="flex gap-4 items-center">
            <input
              type="text"
              v-model="newIngredient.name"
              placeholder="Add an ingredient name"
              class="border rounded !mb-0 px-2"
            />
            <input
              type="number"
              v-model="newIngredient.quantity"
              placeholder="Add quantity"
              class="border rounded !mb-0 px-2"
            />
            <button
              @click.prevent="addIngredient"
              class="border px-4 py-2 rounded !mt-0"
            >
              Add Ingredient
            </button>
          </div>
        </div>

        <div class="flex flex-col gap-2 mt-4">
          <label for="steps" class="font-semibold">Cooking Steps:</label>
          <div
            v-for="(step, index) in recipe.steps"
            :key="step.id"
            class="flex gap-2 justify-between p-4 border"
          >
            <label>
              {{ step.description }}
            </label>
            <button
              @click.prevent="removeStep(index)"
              class="border px-4 py-2 rounded !mt-0"
            >
              Remove
            </button>
          </div>
          <div class="flex gap-2 mt-4">
            <textarea
              v-model="newStep"
              placeholder="Add a cooking step"
              class="min-w-[500px] border rounded !mb-0 p-2"
            ></textarea>
            <button
              @click.prevent="addStep"
              class="border px-4 py-2 rounded !mt-0"
            >
              Add Step
            </button>
          </div>
        </div>

        <div class="mt-4">
          <label for="difficulty" class="font-semibold"
            >Difficulty Level:</label
          >
          <select v-model="recipe.difficulty">
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>

        <button
          type="submit"
          class="border px-4 py-2 rounded !mt-5 w-[200px] self-center"
        >
          {{ isEditMode ? "Update Recipe" : "Add Recipe" }}
        </button>
        <button
          @click="goBack"
          class="border px-4 py-2 rounded !mt-10 w-[200px] self-center"
        >
          Cancel
        </button>
      </form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { useRecipeStore } from "../stores";
import { useRouter, useRoute } from "vue-router";

const recipeStore = useRecipeStore();
const router = useRouter();
const route = useRoute();
const isEditMode = ref(false);
const recipe = ref<IRecipe>({
  id: Date.now(), // Temporary ID generation
  title: "",
  ingredients: [],
  steps: [],
  difficulty: "easy",
});

onMounted(() => {
  const recipeId = route.params.id as string;
  if (recipeId) {
    const foundRecipe = recipeStore.recipes.find(
      (r) => r.id === Number(recipeId)
    );
    recipe.value = { ...foundRecipe };
    isEditMode.value = true;
  }
});

const newIngredient = ref<{ name: string; quantity: number }>({
  name: "",
  quantity: 0,
});
const newStep = ref("");

const addIngredient = () => {
  if (newIngredient.value.name && newIngredient.value.quantity) {
    recipe.value.ingredients?.push({
      id: Date.now(), // Temporary ID generation for each ingredient
      name: newIngredient.value.name,
      quantity: newIngredient.value.quantity,
    });
    newIngredient.value = { name: "", quantity: 0 }; // Clear input
  }
};

const removeIngredient = (index: number) => {
  recipe.value.ingredients?.splice(index, 1);
};

const addStep = () => {
  if (newStep.value) {
    recipe.value.steps?.push({
      id: Date.now(), // Temporary ID generation for each step
      description: newStep.value,
    });
    newStep.value = ""; // Clear input
  }
};

const removeStep = (index: number) => {
  recipe.value.steps?.splice(index, 1);
};

function handleSubmit() {
  if (isEditMode.value) {
    const index = recipeStore.recipes.findIndex(
      (r) => r.id === recipe.value.id
    );
    if (index !== -1) {
      recipeStore.recipes[index] = recipe.value; // Update the recipe in the store
    }
  } else {
    // Call add logic
    recipeStore.addRecipe(recipe.value); // Add the recipe in the store
  }
  goBack();
}
const goBack = () => {
  router.go(-1);
};
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
}

input,
textarea,
select {
  margin-bottom: 1rem;
}

button {
  margin-top: 1rem;
}
</style>
