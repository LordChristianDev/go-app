import { useState, useEffect } from "react";

import { getCookie, setCookie } from "@/utils/helpers";

export const useTheme = () => {
	const [colorMode, setColorMode] = useState<"light" | "dark">(() => {
		const saved = getCookie("chakra-color-mode");
		return (saved as "light" | "dark") || "light";
	});

	useEffect(() => {
		setCookie("chakra-color-mode", colorMode);

		document.documentElement.classList.remove("light", "dark");
		document.documentElement.classList.add(colorMode);
	}, [colorMode]);

	const toggleColorMode = () => {
		setColorMode(colorMode === "light" ? "dark" : "light");
	};

	return { colorMode, toggleColorMode };
}