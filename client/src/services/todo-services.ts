import type { TodoProp } from "@/types/todo-types";

export const QUERIES = {
	fetchTodos: async function (): Promise<TodoProp[]> {
		const response = await fetch("http://localhost:4000/api/todos");
		const data = await response.json();

		if (!response.ok) {
			throw new Error(data.error || "Something went wrong!");
		}

		let filteredTodos: TodoProp[] = data;

		return filteredTodos;
	}
};

export const MUTATIONS = {
	createTodo: async function (new_todo: string): Promise<TodoProp | null> {
		if (!new_todo) {
			alert('Task cannot be empty!');
			return null;
		}

		const response = await fetch("http://localhost:4000/api/todos", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				body: new_todo
			})
		});
		const data = await response.json();

		if (!response.ok) {
			throw new Error(data.error || "Something went wrong!");
		}

		return data;
	},
	updateTodoCompleted: async function (todo: TodoProp): Promise<TodoProp | null> {
		if (todo.completed) {
			alert("To Do is already completed!");
			return null;
		}

		const response = await fetch(`http://localhost:4000/api/todos/${todo._id}`, {
			method: "PATCH",
		});
		const data = await response.json();

		if (!response.ok) {
			throw new Error(data.error || "Something went wrong!");
		}

		return data;
	},
	deleteTodo: async function (todo: TodoProp): Promise<boolean> {
		if (!todo._id) {
			alert("Unable to complete deletion without unique identifier");
			return false;
		}

		const response = await fetch(`http://localhost:4000/api/todos/${todo._id}`, {
			method: "DELETE",
		});
		const data = await response.json();

		if (!response.ok) {
			console.error(data.error || "Something went wrong!");
			return false;
		}

		return true;
	}
}