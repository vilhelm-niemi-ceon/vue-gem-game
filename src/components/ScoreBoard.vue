<script setup lang="ts">
import { defineProps } from 'vue';
defineProps<{
    score: number;
}>()
</script>

<template>
    <div class="score-board">
        <span>Score:</span>
        <b>{{ score }}</b>
    </div>
</template>

<style>
.score-board {
    display: flex;
    flex-direction: row;
    gap: 1;
    align-items: center;
}
</style>
