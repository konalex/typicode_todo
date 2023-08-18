<template>
	<header id="app-header" class="header">
		<div class="header__main-info">
			<div v-show="!open" class="header__main-info--main">
				<span v-if="username">{{ username }}</span>
				<span v-if="name">{{ name }}</span>
				<span v-if="email">{{ email }}</span>
			</div>
			<ul v-show="open" class="header__main-info--opened">
				<li v-for="(item, key) in full" :key="key" class="info-item">
					<b class="info-item__key"> {{ key }}: </b>
					<span class="info-item__value">
						{{ item }}
					</span>
				</li>
			</ul>
		</div>
		<BaseButton class="header__main-info__toggler" @click="open = !open">
			{{ open ? 'Less info' : 'Full info' }}
		</BaseButton>
	</header>
</template>

<script>
import store from '@/store';
import { BaseButton } from '@/components';
import flattenObj from '@/utils/object';

export default {
	name: 'GlobalHeader',
	components: { BaseButton },
	data: () => ({
		open: false,
	}),
	computed: {
		info: () => store.state.user.info,
		name() {
			return this.info?.name;
		},
		email() {
			return this.info?.email;
		},
		username() {
			return this.info?.username;
		},
		full() {
			return flattenObj(this.info);
		},
	},
};
</script>

<style lang="less" scoped>
.header {
	z-index: 10;
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 100%;
	max-width: 720px;
	padding: 1rem 1rem 1rem 0;
	margin: 0 auto;

	&__main-info {
		display: flex;
		justify-content: space-between;
		width: calc(100% - 12rem);
		height: 2.5rem;

		&--main {
			display: flex;
			align-items: center;
			justify-content: space-between;
			width: 100%;
			padding-left: 1rem;
		}

		&--opened {
			position: absolute;
			top: 0;
			display: flex;
			flex-direction: column;
			width: 100%;
			padding: 1rem;
			background-color: var(--color-base-white);

			.info-item {
				display: flex;
				align-items: center;
				justify-content: flex-start;

				&__key {
					margin-right: 0.5rem;
					font-weight: 600;
					text-transform: capitalize;
				}
			}
		}

		&__toggler {
			width: 10rem;
		}
	}
}

@media screen and (width <=720px) {
	.header {
		&__main-info {
			width: calc(100% - 6rem);

			&--main {
				flex-wrap: wrap;
			}

			&--opened {
				position: fixed;
				top: 3rem;
				width: 100%;
			}

			&__toggler {
				width: 5rem;
			}
		}
	}
}
</style>
