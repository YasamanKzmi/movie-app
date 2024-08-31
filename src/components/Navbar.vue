<script setup>
import { ref } from "vue";
const isClicked = ref(false);
const isSelected = ref(false);

function setBorderMovie() {
  isClicked.value = true;
}

function setBorderShow() {
  isSelected.value = true;
}
</script>

<template>
  <div
    class="flex items-center w-full h-16 p-3 text-white bg-gray-900 border-b border-gray-600"
  >
    <div class="flex items-center justify-between w-full">
      <div class="flex flex-row gap-2 md:p-3">
        <img
          src="../assets/movie-recorder.svg"
          class="w-[15px] h-[15px] md:w-[30px] md:h-[30px]"
        />
        <h2 class="text-[12px] md:text-2xl">MovieApp</h2>
      </div>

      <div
        class="flex justify-between md:w-[240px] text-[11px] md:text-base w-[150px] md:mr-5"
      >
        <router-link
          @mouseover="setBorderMovie()"
          :class="[isClicked === true ? 'border-b' : 'border-none']"
          to="/"
          >Movies</router-link
        >
        <router-link
          @mouseover="setBorderShow()"
          :class="[isSelected === true ? 'border-b' : 'border-none']"
          to="/TVShows"
          >TV Shows</router-link
        >
        <router-link to="/watchlist">Watchlist</router-link>
      </div>
    </div>
  </div>
</template>

