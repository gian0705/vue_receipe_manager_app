import { createRouter, createWebHistory } from 'vue-router';

import RecipeList from '../views/RecipeList.vue';
import RecipeDetail from '../views/RecipeDetail.vue';
import RecipeForm from '../views/RecipeForm.vue';


const routes = [
    {
        path: '/',
        name: 'RecipeList',
        component: RecipeList
    },
    {
        path: '/detail/:id',
        name: 'RecipeDetail',
        component: RecipeDetail
    },
    {
        path: '/form',
        name: 'RecipeForm',
        component: RecipeForm
    },

];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;