<script setup lang="ts">
import { ref } from 'vue';
import ScoreBoard from './components/ScoreBoard.vue';
import Table from './components/Table.vue';

let points = ref<number>(0);
</script>

<template>
  <div class="app">
    <ScoreBoard :score="points" />
    <Table @addPoints="(add) => points += add"></Table>
  </div>
</template>

<style scoped>
.app {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>
