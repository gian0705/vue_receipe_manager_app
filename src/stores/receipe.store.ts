import { defineStore } from "pinia";

export type RecipeState = {
    recipes: IRecipe[];
};

export const useRecipeStore = defineStore({
    id: "Recipe",
    state: () =>
    ({
        recipes: [] as IRecipe[],
    } as RecipeState),
    actions: {
        addRecipe(newRecipe: IRecipe) {
            this.recipes.push(newRecipe);
        },
    },
    persist: true,
});
