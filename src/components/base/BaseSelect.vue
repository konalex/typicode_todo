<template>
	<label class="base-select">
		<span class="base-select__label">
			<slot />
		</span>
		<select class="base-select__element" @change="change($event)">
			<option v-for="(item, index) in items" :key="index" :value="item.value" :selected="item.value === preselected">
				{{ item.label }}
			</option>
		</select>
	</label>
</template>

<script>
export default {
	props: {
		items: {
			type: Array,
			default: () => [],
		},
		preselected: {
			type: Number,
			default: 0,
		},
	},
	methods: {
		change(event) {
			const { value } = event.target;
			this.$emit('select', value);
		},
	},
};
</script>

<style lang="less">
.base-select {
	display: inline-flex;
	flex-direction: column;

	&__label {
		margin-left: 0.25rem;
		font-size: 0.75rem;
	}

	&__element {
		padding: 0.25rem;
		border: none;
		border-bottom: 1px solid var(--color-base-gray);
	}
}
</style>
