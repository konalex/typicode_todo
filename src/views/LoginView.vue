<!-- eslint-disable prettier/prettier -->
<template>
	<section class="login">
		<div class="login-wrapper">
			<form class="login-form" @submit.prevent="login">
				<div class="login-form__header">
					<span> Register form </span>
				</div>
				<div class="login-form__body">
					<p>Please, enter the usename and phone</p>
					<BaseInput v-model="username" :validation="validation.username" class="login-form__input"
						placeholder="Username" />
					<BaseInput v-model="phone" class="login-form__input" placeholder="Phone Number" />
					<BaseButton type="submit"> Register </BaseButton>

					<p v-if="error" class="login-form__error">{{ error }}</p>
				</div>
			</form>
		</div>
	</section>
</template>

<script>
import { BaseButton, BaseInput } from '@/components';
import router from '@/router';

export default {
	name: 'Login',
	components: {
		BaseButton,
		BaseInput,
	},
	data: () => ({
		username: 'Kamren',
		phone: '(254)954-1289',
		error: '',
		validation: {
			username: /[^A-Za-z]/gm,
		},
	}),
	methods: {
		login() {
			this.error = '';
			const payload = { name: this.username, phone: this.phone };
			this.$store
				.dispatch('auth', payload)
				.catch((er) => {
					this.error = er.message;
				})
				.then(() => {
					router.push({ name: 'home' });
				});
		},
	},
};
</script>

<style lang="less">
@form_width: convert(447px, rem);
@form_padding_x: convert(25px, rem);
@form_padding_y_bottom: convert(30px, rem);
@form_header_padding_y: convert(15px, rem);
@form_input_padding_y_bottom: convert(20px, rem);

.login {
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	height: 100vh;

	&-wrapper {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
		background-color: var(--color-wrapper-background);
	}

	&-form {
		width: @form_width;
		height: auto;
		overflow: hidden;
		background-color: var(--color-base-gray);
		border-radius: var(--border-radius-base);

		&__header {
			display: flex;
			align-items: center;
			justify-content: center;
			padding: @form_header_padding_y 0;
			margin-bottom: 1rem;
			background-color: var(--color-base-gray-darken);
		}

		&__body {
			padding: 0 @form_padding_x @form_padding_y_bottom;
		}

		&__input {
			padding-bottom: @form_input_padding_y_bottom;

			&:first-of-type {
				margin-top: 1rem;
			}
		}

		&__error {
			margin-top: 0.5rem;
			color: var(--color-base-red);
		}

		[type='submit'] {
			width: 100%;
		}
	}
}
</style>
