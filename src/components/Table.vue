<script setup lang="ts">
import { ref } from 'vue';
import GemColor from '../types/GemColor';
import Gem from './Gem.vue';
import { swap } from '../utils/array-functions';
import Empty from './Empty.vue';
import { getDown, getLeft, getRight, getUp, inSameRow } from '../utils/grid-functions';
import { defineEmits } from 'vue';
const emits = defineEmits<{
    addPoints: [points: number]
}>();

type GemGrid = { disabled?: boolean; empty?: boolean, selected?: boolean, type: GemColor }[]

let selector = ref<null | number>(null);

const _ = { empty: true, type: "red" };
const P = { type: "plain" };
const R = { type: "red" };
const G = { type: "green" };
const B = { type: "blue" };
const Y = { type: "yellow" };

const items = [_, P, P, P, R, G, B, Y];

const randomize = () => Math.floor(Math.random() * items.length)

let grid = ref<any>((() => {
    const grid = [];

    for (let r = 0; r < 6; r++) {
        for (let c = 0; c < 6; c++) {
            grid.push(items[randomize()])
        }
    }

    return grid
})())

function lockGems(gems: GemGrid) {
    return gems.slice().map(gem => ({ ...gem, disabled: true }))
}

function freeGems(gems: GemGrid) {
    return gems.slice().map(gem => ({ ...gem, disabled: false }))
}

function calculateGems(gems: GemGrid, index: number, marked: number[] = [], parentType?: GemColor) {
    const currentGem = gems[index];
    let curGemPoints = 0;

    if (currentGem.type === "plain") {
        return 0;
    }

    let neighboringPairFound = false;

    for (const direction of [getUp(index), getDown(index), getLeft(index), getRight(index)]) {
        if (marked.includes(direction)) {
            continue;
        }

        marked.push(direction);

        const neighboringGem = gems[direction];

        if (
            currentGem && neighboringGem &&
            !currentGem.empty && !neighboringGem.empty &&
            currentGem.type === neighboringGem.type
        ) {
            curGemPoints += {
                red: 25,
                yellow: 50,
                green: 100,
                blue: 1000
            }[currentGem.type];
            curGemPoints += calculateGems(gems, direction, marked, currentGem.type);
            neighboringPairFound = true;
        }
    }

    if (neighboringPairFound || parentType === currentGem.type) {
        gems[index].empty = true;

    }

    return curGemPoints;
}

function selectGem(index: number) {
    selector.value = index;

    const gems = lockGems(grid.value);

    gems[selector.value].disabled = false;

    for (const gem of [getUp(index), getDown(index)]) {
        if (gem <= 0) {
            continue;
        }
        if (gem >= gems.length) {
            continue;
        }

        gems[gem].disabled = false;
    }

    for (const gem of [getRight(index), getLeft(index)]) {
        if (gem <= 0) {
            continue;
        }
        if (gem >= gems.length) {
            continue;
        }
        if (!inSameRow(index, gem)) {
            continue
        }

        gems[gem].disabled = false;
    }

    grid.value = gems;
}

function switchGems(index: number) {
    if (!selector.value) {
        return;
    }

    let gems = grid.value.slice();

    gems = swap(gems, index, selector.value)
    selector.value = null;

    gems = freeGems(gems);

    emits("addPoints", calculateGems(gems, index));

    grid.value = gems;
}

</script>

<template>
    <div class="table">
        <div v-for="gem, i in grid" class="item">
            <Empty v-if="gem.empty" />
            <Gem v-else :type="gem.type" :selected="selector === i" :disabled="gem.disabled"
                @click="() => selector === null ? selectGem(i) : switchGems(i)" />
        </div>
    </div>
</template>

<style scoped>
.table {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    grid-template-rows: repeat(6, 1fr);
    grid-column-gap: 0.4rem;
    grid-row-gap: 0.4rem;
}

.item {
    transform: ease-in-out 0.5s;
    grid-column: auto 1fr;
    grid-row: auto 1fr;
    width: max-content;
    height: max-content;
}
</style>
