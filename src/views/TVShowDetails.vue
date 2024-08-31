<script setup>
import { onMounted } from "vue";
import { useRoute } from "vue-router";
import { ref } from "vue";
import store from "@/store";

const isLoading = ref('false')

const route = useRoute();


const IMG_URL = "https://image.tmdb.org/t/p/w500";

onMounted(() => {
  isLoading.value = true;
  fetch(
    `https://api.themoviedb.org/3/tv/${route.params.id}?api_key=720ad2987e909dda7a20407b983dd9fa`
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      isLoading.value = false;
      store.state.dataById = data;

      store.state.genres = [];
      data.genres.forEach((genre) => store.state.genres.push(genre.name));
    });
});

function addToWatchlist() {
  store.state.obj = {
    id: route.params.id,
    image: IMG_URL + store.state.dataById.poster_path,
    homepage: store.state.dataById.homepage,
  };
  
}

</script>


<template>
  <div class="bg-gray-900 w-full min-h-[100dvh] flex justify-center items-center overflow-auto"> 
    <div v-if="isLoading"><span class="loader"></span></div>
    
    <div v-else class="flex flex-col items-center xl:gap-20 p-6 text-white  md:flex-row h-[600px] ">
      <div class="w-[230px] h-[300px] md:w-[250px] md:h-[300px] xl:w-[300px]  xl:h-[400px] flex justify-center">
        <img
          :src="`${IMG_URL + store.state.dataById.poster_path}`"
          class="w-full"
        />
      </div>

      <div class="flex flex-col gap-5  max-w-[700px] max-h-[700px] p-5 text-sm md:text-base items-center md:items-start">
        <p class="text-xl md:text-4xl">{{ store.state.dataById.original_name }}</p>

        <div class="flex flex-row items-center gap-2">
          <div class="svg">
            <svg
              class="w-3 h-3 text-yellow-600 fill-current"
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

          <p class="text-sm">{{ store.state.dataById.vote_average.toFixed(1) }}/10</p>
        </div>
        <p class="text-xs">Released: {{ store.state.dataById.first_air_date }}</p>

        <div class="flex flex-row gap-4 text-xs text-white">
          <p v-for="genre in store.state.genres.slice(0, 4)" :key="genre">
            {{ genre }}
          </p>
        </div>

        <p class="text-center md:text-start">{{ store.state.dataById.overview }}</p>

        <button
          class="p-3 bg-orange-400 md:mt-5 border-md flex justify-center items-center hover:bg-orange-500/75 hover:text-gray-300 w-full  h-[40px] md:w-[150px] text-black font-bold text-sm"
        >
          <div class="flex flex-row items-center gap-2">
            <img
              src="../assets/play-circle-svgrepo-com (1).svg"
              class="w-3 h-3 md:h-5 md:w-5"
            />

            <a :href="store.state.dataById.homepage" class="text-xs md:text-sm">Watch Now</a>
          </div>
        </button>
        <router-link @click="addToWatchlist" to="/watchlist"
          >Add to the Watchlist</router-link>
      </div>
    </div>
  </div>
</template>


<style scoped>
.loader {
  width: 60px;
  height: 60px;
  border: 5px dotted #FFF;
  border-radius: 50%;
  display: inline-block;
  position: relative;
  box-sizing: border-box;
  animation: rotation 2s linear infinite;
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
} 
</style>

