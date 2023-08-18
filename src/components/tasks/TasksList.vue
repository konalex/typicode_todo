<template>
	<section class="tasks">
		<ul class="tasks__list">
			<li v-for="task in tasks" :key="task.id" :class="['item', { 'item--completed': task.completed }]">
				<TaskFavorite :active="task.favorite" class="item__favorite" @click="favorite(task.id)"></TaskFavorite>
				<BaseCheckBox :value="task.completed" class="item__state" @change="toggle(task.id)">
					<span class="item__title">
						{{ task.title }}
					</span>
				</BaseCheckBox>
			</li>
		</ul>
	</section>
</template>

<script>
import { BaseCheckBox, TaskFavorite } from '@/components';

export default {
	components: {
		TaskFavorite,
		BaseCheckBox,
	},
	props: {
		tasks: {
			type: Array,
			default: () => [],
		},
	},
	methods: {
		toggle(id) {
			this.$store.dispatch('changeTaskByID', id);
		},
		favorite(id) {
			this.$store.dispatch('toggleFavorite', id);
			// this.$emit('update');
		},
	},
};
</script>

<style lang="less" scoped>
.tasks {
	&__list {
		display: flex;
		flex-direction: column;

		.item {
			display: inline-flex;
			align-items: center;
			justify-content: flex-start;
			margin-top: 0.5rem;

			&__favorite {
				margin-right: 1rem;
			}

			&__title {
				margin-left: 1rem;
			}

			&--completed {
				.item__title {
					text-decoration: line-through;
				}
			}
		}
	}
}

@media screen and (width <=720px) {
	.tasks__list {
		padding: 0.25rem;

		.item {
			align-items: flex-start;
			width: 100%;
			padding-bottom: 0.25rem;
			margin-bottom: 1rem;
			border-bottom: 1px solid var(--color-base-gray);

			&__title {
				width: calc(100% - 2rem);
			}

			&__state {
				align-items: flex-start;
			}
		}
	}
}
</style>
