
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

    },
    persist: true,
})