<template>
	<label class="base-checkbox">
		<input :checked="value" type="checkbox" @click="change" />

		<slot></slot>
	</label>
</template>

<script>
export default {
	props: {
		value: {
			type: Boolean,
			default: false,
		},
	},
	methods: {
		change() {
			this.$emit('change', !this.value);
		},
	},
};
</script>

<style lang="less">
.base-checkbox {
	display: flex;
	align-items: center;
	justify-content: flex-start;
	width: 100%;
	cursor: pointer;

	input {
		width: 1.25rem;
		height: 1.25rem;
	}
}
</style>
