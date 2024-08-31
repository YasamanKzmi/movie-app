<script setup>
const IMG_URL = "https://image.tmdb.org/t/p/w500";

const props = defineProps({
  title: String,
  rating: Number,
  posterImg: String,
  year: String,
  id: Number
});
</script>



<template>
  <router-link :to="{path: `/tvshowdetails/${id}`, component: TVShowDetails}"
    class="card w-[140px] h-[250px] md:w-[250px] md:h-[400px] bg-slate-900 rounded-sm pb-16 md:pb-24 mb-5 text-gray-200 shadow-lg shadow-gray-700 mt-5  hover:scale-105 transition ease-in-out delay-105"
  >
    <img :src="`${IMG_URL + posterImg}`" class="w-full h-[90%]" />

    <div class="p-2 text-xs md:text-base md:p-3">
      <h2 class="font-semibold">{{ title }}</h2>
      <p class="text-gray-500 text-md">{{ year.slice(0, 4) }}</p>
      <div class="flex flex-row items-center gap-1 mt-2 text-sm text-gray-500">
        <div class="svg">
          <svg
            class="w-2 h-2 text-yellow-600 fill-current md:h-3 md:w-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z"
            />
          </svg>
        </div>

        <div class="text-xs md:text-base">{{ rating.toFixed(1) }}/10</div>
      </div>
    </div>
  </router-link>
</template>