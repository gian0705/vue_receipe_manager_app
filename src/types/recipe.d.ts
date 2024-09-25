declare interface IRecipe {
    id?: number;
    title?: string;
    ingredients?: Ingredient[];
    steps?: CookingStep[];
    difficulty?: 'easy' | 'medium' | 'hard';
}