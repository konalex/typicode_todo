<!-- eslint-disable prettier/prettier -->
<!-- eslint-disable vue/first-attribute-linebreak -->
<template>
	<div :class="['task-create', { 'task-create--active': open }]">
		<BaseButton @click="open = !open"> {{ open ? 'Close' : 'Create' }} </BaseButton>
		<form class="task-create__form" @submit.prevent="submit">
			<BaseInput v-model="user" :validation="validation.user" class="login-form__input" placeholder="User id"
				type="number" />
			<BaseInput v-model="title" class="login-form__input" placeholder="Title" />
			<BaseButton type="submit"> Add </BaseButton>
		</form>
	</div>
</template>

<script>
import { BaseButton, BaseInput } from '@/components';

export default {
	components: { BaseInput, BaseButton },
	data: () => ({
		open: false,
		user: '',
		title: '',
		validation: {
			user: /[^0-9]/,
		},
	}),
	methods: {
		submit() {
			const check = !this.title || !this.user || this.validation.user.test(this.user);
			if (check) return false;

			this.$store.dispatch('addTask', { user: +this.user, title: this.title });
			this.title = '';
			this.user = '';
		},
	},
};
</script>

<style lang="less">
.task-create {
	position: fixed;
	bottom: -2rem;
	display: flex;
	flex-direction: column;
	align-items: flex-end;
	width: 100%;
	max-width: 720px;
	height: 5rem;
	transition: all 250ms ease-in-out;

	&__form {
		width: 100%;
		padding: 1rem;
		background-color: var(--color-base-white);

		.base-input {
			margin-right: 0.25rem;
			margin-left: 1rem;

			input {
				margin-bottom: 1rem;
				border-bottom: 1px solid var(--color-base-gray);
				border-radius: 0;
			}
		}
	}

	&--active {
		transform: translateY(-15rem);
	}
}

@media screen and (width <=720px) {
	.task-create {
		padding: 0.25rem;

		&--active {
			transform: translateY(-11rem);
		}
	}
}
</style>
