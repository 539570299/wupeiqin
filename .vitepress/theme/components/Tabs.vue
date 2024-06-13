<script setup>
import { ref } from 'vue'

const props = defineProps({
    tabs: {
        type: Array,
        required: true
    }
})

const activeTab = ref(0)

const selectTab = (index) => {
    activeTab.value = index
}
</script>
<template>
    <div>
        <div class="tabs">
            <div v-for="(tab, index) in tabs" :key="index" class="tab" :class="{ active: activeTab === index }" @click="selectTab(index)">{{ tab }}</div>
        </div>
        <div class="tab-content">
            <slot name="content" :selected="activeTab"></slot>
        </div>
    </div>
</template>
<style scoped>
.tabs {
    color: #525860;
    display: flex;
    margin-bottom: 0;
    overflow-x: auto;
    padding-left: 0;
}

.tab {
    word-wrap: break-word;
    border-bottom: 3px solid #0000;
    border-radius: 4px;
    cursor: pointer;
    display: inline-flex;
    padding: 10px 10px;
    transition: background-color 200ms cubic-bezier(0.08,0.52,0.52,1);
}

.tab.active {
    border-bottom-color: #06c4b0;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    color: #06c4b0;
}
</style>
  