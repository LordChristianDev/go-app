import { useQuery } from "@tanstack/react-query";
import { Container, Flex, Spinner, Stack, Text } from "@chakra-ui/react";

import { TodoItem } from "@/components/todo-item";

import type { TodoProp } from "@/types/todo-types";
import { QUERIES } from "@/services/todo-services";

export const TodoList = () => {
	const { data: todoList, isFetching: todoFetching } = useQuery<TodoProp[]>({
		queryKey: ["todos"],
		queryFn: () => QUERIES.fetchTodos(),
		refetchOnWindowFocus: true,
		refetchOnMount: true,
	});

	return (
		<Container maxW={"900px"}>
			<Text fontSize={"4xl"} textTransform={"uppercase"} fontWeight={"bold"} textAlign={"center"} my={2}>
				Today's Tasks
			</Text>

			{todoFetching && (
				<Flex justifyContent={"center"} my={4}>
					<Spinner size={"xl"} />
				</Flex>
			)}
			{!todoFetching && todoList?.length === 0 && (
				<Stack alignItems={"center"} gap='3'>
					<Text fontSize={"xl"} textAlign={"center"} color={"gray.500"}>
						All tasks completed! 🤞
					</Text>
					<img src='/go.png' alt='Go logo' width={70} height={70} />
				</Stack>
			)}
			<Stack gap={3}>
				{todoList?.map((todo) => (
					<TodoItem key={todo._id} todo={todo} />
				))}
			</Stack>
		</Container>
	);
};