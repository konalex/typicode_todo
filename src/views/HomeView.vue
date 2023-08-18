<!-- eslint-disable prettier/prettier -->
<template>
	<main class="home-view">
		<div class="tasks-filters">
			<BaseSelect id="filter-by-user" :items="users" :preselected="+$store.state.user.userId"
				@select="changeUser($event)">
				By User
			</BaseSelect>
			<BaseSelect id="filter-by-state" :items="states" :preselected="+$store.state.tasks.filters.state"
				@select="changeState($event)"> By State </BaseSelect>
			<form id="task-search" @submit.prevent="search">
				<BaseInput placeholder="Search by title" :value="searchString" @input="searchString = $event" />
				<BaseButton> Search </BaseButton>
			</form>
		</div>
		<TasksList :tasks="filtered" @update="update" />
		<TaskForm />
	</main>
</template>

<script>
import { BaseInput, BaseButton, BaseSelect, TasksList, TaskForm } from '@/components';
import { visualStates } from '@/utils/enums';

export default {
	name: 'Home',
	components: { TasksList, BaseSelect, BaseInput, BaseButton, TaskForm },
	data: () => ({
		searchString: '',
		filtered: [],
	}),
	computed: {
		users() {
			const result = this.$store.state.user.users.map((el) => {
				return { value: el, label: `User with id ${el}` };
			});

			result.push({
				value: 0,
				label: 'All users',
			});

			return result;
		},
		states: () => visualStates,
	},
	mounted() {
		this.changeUser(this.$store.state.user.userId);
	},
	methods: {
		search() {
			this.$store.commit('SET_FILTER', {
				key: 'string',
				value: this.searchString,
			});
			this.update();
		},
		changeState(event) {
			this.$store.commit('SET_FILTER', {
				key: 'state',
				value: event,
			});
			this.update();
		},
		changeUser(event) {
			this.$store.commit('SET_FILTER', {
				key: 'userId',
				value: event,
			});
			this.update();
		},
		update() {
			this.$store.dispatch('searchTasks').then((result) => {
				this.filtered = result;
			});
		},
	},
};
</script>

<style lang="less">
.home-view {
	width: 100%;
	max-width: 720px;
	margin: 0 auto;
}

.tasks-filters {
	display: flex;
	align-items: flex-end;
	margin-bottom: 1rem;

	#filter-by-user {
		margin-right: 1rem;
	}

	#task-search {
		display: flex;

		.base-input {
			margin-right: 0.25rem;
			margin-left: 1rem;

			input {
				border-bottom: 1px solid var(--color-base-gray);
				border-radius: 0;
			}
		}
	}
}

@media screen and (width <=720px) {
	.tasks-filters {
		flex-wrap: wrap;
		padding: 0 0.25rem;

		.base-select {
			width: calc(50% - 0.5rem);

			&#filter-by-user {
				margin-right: 0;
			}

			&#filter-by-state {
				margin-left: 1rem;
			}
		}

		#task-search {
			width: 100%;
			margin-top: 1rem;

			.base-input {
				margin-left: 0;
			}
		}
	}
}
</style>
