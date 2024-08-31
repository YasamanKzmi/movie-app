<script setup>
import Navbar from "@/components/Navbar.vue";
import MovieCard from "../components/MovieCard.vue";
import store from "../store/index.js";
import { ref } from "vue";

const API_KEY = "720ad2987e909dda7a20407b983dd9fa";
const base_URL = "https://api.themoviedb.org/3";

const isLoading = ref(false);
const inputSearch = ref("");

getData();
function getData() {
  isLoading.value = true;
  fetch(
    `http://api.themoviedb.org/3/discover/movie?&sort_by=popularity.desc&page=1&api_key=${API_KEY}`
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data.results);
      isLoading.value = false;
      store.state.resData = data.results;
    });
}

function searchMovie() {
  fetch(
    `https://api.themoviedb.org/3/search/movie?query=${inputSearch.value}&api_key=720ad2987e909dda7a20407b983dd9fa`
  )
    .then((res) => res.json())
    .then((data) => {
      store.state.resData = data.results;
    });
}
</script>



<template>
  <div class="bg-gray-900 w-full h-[100vh]">
    <Navbar></Navbar>

    <div>
      <input
        type="text"
        placeholder="Search a movie"
        class="p-1 text-gray-200 md:w-[400px] w-[200px] sm:w-[300px] text-xs sm:text-base bg-slate-900 border border-gray-500"
        v-model="inputSearch"
        @keyup="searchMovie()"
      />
    </div>

    <div
      v-if="inputSearch === ''"
      class="mt-3 ml-3 text-sm text-gray-300 md:mt-8 md:text-3xl"
    >
      Popular Movies
    </div>

    <div v-if="isLoading"><span class="loader"></span></div>

    <div
      v-else
      class="grid justify-center grid-cols-2 gap-3 pl-3 pr-3 bg-gray-900 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
    >
      <MovieCard
        :resData="store.state.resData"
        v-for="data in store.state.resData"
        :key="data.id"
        :title="data.title"
        :rating="data.vote_average"
        :year="data.release_date"
        :posterImg="data.poster_path"
        :id="data.id"
      ></MovieCard>
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