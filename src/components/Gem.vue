<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
    type: "red" | "green" | "yellow" | "blue" | "plain",
    selected?: boolean,
    disabled?: boolean
}>()

const emits = defineEmits<{
    click: []
}>();

const color = computed(() => ({
    red: props.type === 'red',
    green: props.type === 'green',
    yellow: props.type === 'yellow',
    blue: props.type === 'blue',
    plain: props.type === "plain"
}))

const selected = computed(() => ({
    selected: props.selected
}))

const disabled = computed(() => ({
    disabled: props.disabled
}))
</script>

<template>
    <div class="gem" :class="selected, disabled" @click="emits('click')">
        <div class="base" :class="color">
            <div class="shine" :class="color"></div>
            <div class="reflection-top"></div>
            <div class="reflection-bottom"></div>
            <div class="scatter" :class="color"></div>
            <div v-if="props.selected" class="selection-border">
                <div></div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.gem {
    cursor: pointer;
    width: 3rem;
    height: 3rem;
    transition: ease-in-out 0.2s;
}

.disabled {
    pointer-events: none;
    filter: opacity(40%) blur(1.25px);
}

.gem.selected {
    opacity: 100;
    filter: brightness(125%);
}

.gem:hover {
    filter: brightness(125%);
}

.reflection-top {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    border-top: solid 3px white;
    border-radius: 40%;
    filter: blur(0.5px) brightness(150%);
}

.reflection-bottom {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    border-bottom: solid 2px white;
    border-radius: 40%;
    filter: blur(1px) brightness(150%);
}

.selection-border {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10;
}
.selection-border > div {
    width: 2rem;
    height: 2rem;
    border-radius: 40%;
    border: solid 1px white;
    filter: blur(0.5px)
}

.base {
    position: relative;

    width: 100%;
    height: 100%;
    border-radius: 40%;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: space-between;
    overflow: hidden;
    border: solid 2px;
}

.shine {
    width: 100%;
    height: 8%;
    border-bottom-left-radius: 40%;
    border-bottom-right-radius: 40%;
    opacity: 70%;
    filter: blur(2px) brightness(250%);
}

.scatter {
    height: 50%;
    width: 100%;
    filter: blur(6px);
    border-radius: 100%;
}

.base.plain {
    border-color: rgb(88, 98, 125);
    background-color: rgb(47, 43, 70);
    filter: drop-shadow(0px 4px 4px rgb(47, 43, 70))
}

.base.red {
    border-color: #b03a2e;
    background-color: #b03a2e;
    filter: drop-shadow(0px 4px 4px #b03a2eab)
}

.base.green {
    border-color: #239b56;
    background-color: #239b56;
    filter: drop-shadow(0px 4px 4px #239b56ab)
}

.base.yellow {
    border-color: #b7950b;
    background-color: #b7950b;
    filter: drop-shadow(0px 4px 4px #b7950bab);
}

.base.blue {
    border-color: #2874a6;
    background-color: #2874a6;
    filter: drop-shadow(0px 4px 4px #2874a6ab);
}

.shine.red {
    background-color: #ec7063;
}

.shine.green {
    background-color: #58d68d;
}

.shine.yellow {
    background-color: #f4d03f;
}

.shine.blue {
    background-color: #5dade2;
}

.scatter.plain {
    background-color: rgb(102, 108, 124);
}
.scatter.red {
    background-color: #ec7063;
}

.scatter.green {
    background-color: #58d68d;
}

.scatter.yellow {
    background-color: #f4d03f;
}

.scatter.blue {
    background-color: #5dade2;
}
</style>
