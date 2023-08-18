<template>
	<label :class="['base-input', { 'base-input--error': error }]">
		<span>
			<slot />
		</span>
		<input v-model="innerValue" type="text" v-bind="$attrs" @input="onInput()" />
		<span v-if="error" class="base-input__error">
			{{ error }}
		</span>
	</label>
</template>

<script>
const ERROR_MESSAGES = {
	validation: 'Invalid value',
};

export default {
	name: 'BaseInput',
	inheritAttrs: false,
	props: {
		value: {
			type: String,
			default: '',
		},
		validation: {
			type: RegExp,
			default: null,
		},
		forceValidation: {
			type: Boolean,
			default: false,
		},
	},
	data: () => ({
		innerValue: '',
		error: '',
	}),
	watch: {
		value: {
			handler(newValue) {
				this.innerValue = newValue;
			},
			immediate: true,
		},
	},
	methods: {
		onInput() {
			if (this.validation) {
				if (this.forceValidation) this.innerValue = this.innerValue.replaceAll(this.validation, '');
				else this.error = this.validation.test(this.innerValue) ? ERROR_MESSAGES.validation : '';
			}
			this.$emit('input', this.innerValue);
		},
	},
};
</script>

<style lang="less">
@p: convert(10px, rem);
@fz: convert(17px, rem);

.base-input {
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	justify-content: flex-start;

	input {
		width: 100%;
		padding: @p;
		font-size: @fz;
		font-weight: 400;
		color: var(--color-text);
		background-color: var(--color-base-white);
		border: 1px solid transparent;
		border-radius: var(--border-radius-base);
		outline: none;
	}

	&--error {
		input {
			border-color: var(--color-base-red);
		}
	}

	&__error {
		position: absolute;
		bottom: 0;
		font-size: 0.75rem;
		color: var(--color-base-red);
	}
}
</style>
