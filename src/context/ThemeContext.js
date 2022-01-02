import { createContext, useEffect, useState} from "react"

export const ThemeContext = createContext()


export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState("light")

    useEffect(() => {
        const body = window.document.body 
        switch (theme) {
            case "dark": 
                body.classList.add("body-dark");
                break;
            default:
                body.classList.remove("body-dark")
                break;
        }
    }, [theme])

    const changeTheme = () => {
        setTheme(theme === "light" ? "dark": "light");
    }

    return (
    <ThemeContext.Provider value={{ theme, changeTheme}}>
        {children}
    </ThemeContext.Provider>)
}