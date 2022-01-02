import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

export const useTheme = () => {
    const themeContext = useContext(ThemeContext)

    if (themeContext === undefined) {
        throw new Error("useTheme() must be use inside a ThemeProvider")
    }



    return themeContext
}