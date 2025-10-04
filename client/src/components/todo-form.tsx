import { useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { Button, Container, Flex, Input, Spinner } from "@chakra-ui/react";

export const TodoForm = () => {
	const [newTodo, setNewTodo] = useState<string>("");
	const [isPending, setIsPending] = useState<boolean>(false);

	const createTodo = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsPending(true)


		setTimeout(() => setIsPending(false), 3000)
		alert("Todo added!");
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
