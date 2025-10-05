import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { IoMdAdd } from "react-icons/io";
import { Button, Container, Flex, Input, Spinner } from "@chakra-ui/react";

import { MUTATIONS } from "@/services/todo-services";

export const TodoForm = () => {
	const [newTodo, setNewTodo] = useState<string>("");
	const [isPending, setIsPending] = useState<boolean>(false);

	const queryClient = useQueryClient();

	const createTodo = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!newTodo) {
			alert('Task cannot be empty!');
			return;
		}
		setIsPending(true);

		const response = await MUTATIONS.createTodo(newTodo);

		if (!response) {
			throw new Error("Unable to update todo")
		}

		alert("Todo added!");
		queryClient.invalidateQueries({ queryKey: ["todos"] });

		setNewTodo("");
		setIsPending(false);
	};

	return (
		<Container maxW={"900px"}>
			<form onSubmit={createTodo}>
				<Flex gap={2}>
					<Input
						type='text'
						value={newTodo}
						onChange={(e) => setNewTodo(e.target.value)}
						ref={(input) => {
							if (input) input.focus();
						}}
					/>
					<Button
						mx={2}
						type='submit'
						_active={{
							transform: "scale(.97)",
						}}
					>
						{isPending ? <Spinner size={"xs"} /> : <IoMdAdd size={30} />}
					</Button>
				</Flex>
			</form>
		</Container>

	);
};
