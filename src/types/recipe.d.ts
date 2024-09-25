declare interface IRecipe {
    id?: number;
    title?: string;
    ingredients?: Iingredient[];
    steps?: ICookingStep[];
    difficulty?: 'easy' | 'medium' | 'hard';
}