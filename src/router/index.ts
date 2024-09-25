import { createRouter, createWebHistory } from 'vue-router';

import RecipeList from '../views/RecipeList.vue';

import RecipeForm from '../views/RecipeForm.vue';


const routes = [
    {
        path: '/',
        name: 'RecipeList',
        component: RecipeList
    },
    {
        path: '/edit/:id',
        name: 'EditForm',
        component: RecipeForm
    },
    {
        path: '/add',
        name: 'RecipeForm',
        component: RecipeForm
    },

];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;