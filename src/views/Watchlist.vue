<script setup>
import store from "@/store";
import { onMounted, ref, watch } from "vue";
const IMG_URL = "https://image.tmdb.org/t/p/w500";

const savedData = ref([]);
const uniqueSavedData = ref([]);

seveData();
async function seveData() {
  const response = await fetch(
    `https://movieapp-a6ef4-default-rtdb.firebaseio.com/watchlist.json`,
    {
      method: "POST",
      body: JSON.stringify(store.state.obj),
    }
  );
  const responseData = await response.json();
}

onMounted(() => {
  fetchData();
  async function fetchData() {
    const response = await fetch(
      "https://movieapp-a6ef4-default-rtdb.firebaseio.com/watchlist.json"
    );
    const responseData = await response.json();
    savedData.value = Object.values(responseData);
    uniqueSavedData.value = [
      ...new Set(savedData.value.map(JSON.stringify)),
    ].map(JSON.parse);
    console.log(uniqueSavedData.value);
  }
});
</script>



<template>
  <div
    class="bg-gray-900 w-full min-h-[100dvh] grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 justify-start items-start overflow-auto flex-col lg:flex-row p-5 gap-5 cols-2"
  >
    <div
      v-for="data in uniqueSavedData"
      :key="data.id"
      class="w-full gap-3 mb-5 text-white shadow-lg shadow-gray-700 h-[150px] md:h-[200px] flex-row flex items-center justify-between pr-2 md:pr-10 mt-5"
    >
      <div class="w-[150px] h-[150px] md:w-[200px] md:h-[200px]">
        <img :src="data.image" class="w-full h-full" />
      </div>

      <div class="flex flex-col items-center gap-2">
        <a :href="data.homepage" class="text-xs">Watch Now</a>
        <a :href="data.homepage">
          <img src="../assets/next-svgrepo-com (1).svg" class="w-10 h-10" />
        </a>
      </div>
    </div>
  </div>
</template>