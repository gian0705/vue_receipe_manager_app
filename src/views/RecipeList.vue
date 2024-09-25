<template>
  <div>
    <nav class="bg-slate-600">
      <div class="flex justify-between p-4">
        <span class="text-white text-xl font-bold">Recipe Manager</span>
        <div class="flex gap-2">
          <router-link to="/add" class="add-button text-white">
            <i class="fas fa-plus"></i> Add Recipe
          </router-link>
        </div>
      </div>
    </nav>
  </div>
</template>
