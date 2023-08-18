<template>
	<div id="app">
		<GlobalHeader v-if="isAuthorized" />
		<router-view class="container" />
	</div>
</template>

<script setup>
// used setup for code simplicity
import { computed } from 'vue';
import { GlobalHeader } from '@/components';
import store from './store';

const isAuthorized = computed(() => store.getters.isAuthorized);
</script>
