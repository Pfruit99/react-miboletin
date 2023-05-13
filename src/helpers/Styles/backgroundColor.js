import { colors } from "./variables"

export const backgroundColor = (color) => {
    return { backgroundColor: colors[color] }
}

export const colorText = (color) => {
    return { color: colors[color] }
}
