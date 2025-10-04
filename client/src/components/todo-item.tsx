import { MdDelete } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";
import { Badge, Box, Flex, Text } from "@chakra-ui/react";

export const TodoItem = ({ todo }: { todo: any }) => {
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
				<Box color={"green.500"} cursor={"pointer"}>
					<FaCheckCircle size={20} />
				</Box>

				<Box color={"red.500"} cursor={"pointer"}>
					<MdDelete size={25} />
				</Box>
			</Flex>
		</Flex>
	);
};