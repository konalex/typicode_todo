<template>
	<button class="base-button" @click="$emit('click')">
		<slot></slot>
	</button>
</template>

<style lang="less">
@py: convert(10px, rem);
@px: convert(30px, rem);
@fz: convert(17px, rem);

.base-button {
	display: flex;
	align-items: center;
	justify-content: center;
	padding: @py @px;
	font-size: @fz;
	font-weight: 600;
	color: var(--color-base-white);
	cursor: pointer;
	background-color: var(--color-button-background);
	border: none;
	border-radius: var(--border-radius-base);
	outline: none;
	transition: all 150ms ease-in-out;

	&:hover {
		background-color: var(--color-button-background-hover);
	}
}
</style>
