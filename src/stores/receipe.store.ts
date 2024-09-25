
import { defineStore } from 'pinia';

export type RecipeState = {
    recipes: IRecipe[];
}


export const useRecipeStore = defineStore({
    id: 'Recipe',
    state: () => ({
        recipes: []
    } as RecipeState),
    actions: {
        addRecipe(newRecipe: IRecipe) {
            this.recipes.push(newRecipe);
            console.log('this.recipes~~~', this.recipes);

        },
    },
    persist: true,
})