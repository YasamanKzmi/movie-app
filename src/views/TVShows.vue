<script setup>
import Navbar from "@/components/Navbar.vue";
import TVShowCard from "../components/TVShowCard.vue";
import store from "../store/index.js";
import { ref } from "vue";

const API_KEY = "720ad2987e909dda7a20407b983dd9fa";
const base_URL = "https://api.themoviedb.org/3";

const isLoading = ref(false);
const inputSearch = ref("")

getTVShowsData();
function getTVShowsData() {
  isLoading.value = true;
  fetch(
    `https://api.themoviedb.org/3/discover/tv?include_adult=false&api_key=${API_KEY}&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc`
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data.results);
      isLoading.value = false;
      store.state.resDataTVShows = data.results;
    });
}

function searchTVShows() {
fetch(
  `https://api.themoviedb.org/3/search/tv?query=${inputSearch.value}&api_key=720ad2987e909dda7a20407b983dd9fa`
)
  .then((res) => res.json())
  .then((data) => {
    store.state.resDataTVShows = data.results;
  });
}
</script>



<template>
  <div class="bg-gray-900 w-full h-[100vh]">
    <Navbar></Navbar>

    <div>
      <input
        type="text"
        placeholder="Search a TV Show"
        class="p-1 text-gray-200 md:w-[400px] w-[200px] sm:w-[300px] text-xs sm:text-base border  bg-slate-900 border-gray-500"
        v-model="inputSearch"
        @keyup="searchTVShows()"
      />
    </div>

    <div v-if="inputSearch===''" class="mt-3 ml-3 text-sm text-gray-300 md:mt-8 md:text-3xl">Popular TV Shows</div>

    <div v-if="isLoading"><span class="loader"></span></div>

    <div
      v-else
      class="grid justify-center grid-cols-2 gap-3 pl-3 pr-3 bg-gray-900 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
    >

      <TVShowCard
        :resData="store.state.resDataTVShows"
        v-for="data in store.state.resDataTVShows"
        :key="data.id"
        :title="data.original_name"
        :rating="data.vote_average"
        :year="data.first_air_date"
        :posterImg="data.poster_path"
        :id="data.id"
      ></TVShowCard>
    </div>
  </div>
</template>


<style scoped>
.loader {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  display: block;
  margin: 15px auto;
  position: relative;
  color: #fff;
  box-sizing: border-box;
  animation: animloader 2s linear infinite;
  margin-top: 100px;
}

@keyframes animloader {
  0% {
    box-shadow: 14px 0 0 -2px, 38px 0 0 -2px, -14px 0 0 -2px, -38px 0 0 -2px;
  }
  25% {
    box-shadow: 14px 0 0 -2px, 38px 0 0 -2px, -14px 0 0 -2px, -38px 0 0 2px;
  }
  50% {
    box-shadow: 14px 0 0 -2px, 38px 0 0 -2px, -14px 0 0 2px, -38px 0 0 -2px;
  }
  75% {
    box-shadow: 14px 0 0 2px, 38px 0 0 -2px, -14px 0 0 -2px, -38px 0 0 -2px;
  }
  100% {
    box-shadow: 14px 0 0 -2px, 38px 0 0 2px, -14px 0 0 -2px, -38px 0 0 -2px;
  }
}
</style>