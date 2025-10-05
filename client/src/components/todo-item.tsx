import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { MdDelete } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";
import { Badge, Box, Flex, Spinner, Text } from "@chakra-ui/react";

import type { TodoProp } from "@/types/todo-types";
import { MUTATIONS } from "@/services/todo-services";

export const TodoItem = ({ todo }: { todo: TodoProp }) => {
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const queryClient = useQueryClient();

	async function handleUpdate() {
		if (todo.completed) {
			alert("To Do is already completed!");
			return;
		}
		setIsLoading(true);

		const response = await MUTATIONS.updateTodoCompleted(todo);

		if (!response) {
			throw new Error("Unable to update todo");
		}
		queryClient.invalidateQueries({ queryKey: ["todos"] });

		setIsLoading(false);
	};

	async function handleDelete() {
		setIsLoading(true);

		const response = await MUTATIONS.deleteTodo(todo);
		if (!response) {
			throw new Error("Unable to delete todo");
		}
		queryClient.invalidateQueries({ queryKey: ["todos"] });

		setIsLoading(false);
	}

	return (
		<Flex gap={2} alignItems={"center"}>
			<Flex
				flex={1}
				alignItems={"center"}
				border={"2px"}
				borderColor={"gray.600"}
				p={2}
				borderRadius={"lg"}
				justifyContent={"space-between"}
			>
				<Text
					color={todo.completed ? "green.500" : "yellow.500"}
					textDecoration={todo.completed ? "line-through" : "none"}
				>
					{todo.body}
				</Text>

				{todo.completed && (
					<Badge ml='1' colorScheme='green'>
						Done
					</Badge>
				)}

				{!todo.completed && (
					<Badge ml='1' colorScheme='yellow'>
						In Progress
					</Badge>
				)}
			</Flex>

			<Flex gap={2} alignItems={"center"}>
				<Box color={"green.500"} cursor={"pointer"} onClick={() => handleUpdate()}>
					{isLoading ? (
						<Spinner size={"sm"} />
					) : (
						<FaCheckCircle size={20} />
					)}

				</Box>

				<Box color={"red.500"} cursor={"pointer"} onClick={() => handleDelete()}>
					{isLoading ? (
						<Spinner size={"sm"} />
					) : (
						<MdDelete size={25} />
					)}
				</Box>
			</Flex>
		</Flex>
	);
};