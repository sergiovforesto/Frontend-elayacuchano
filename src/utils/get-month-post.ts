import { months } from "./months";

export const obtenerMes = (created: Date) => {
    let dateCreated = new Date(created);
    let month = months[dateCreated.getMonth()];
    let date = dateCreated.getDate()

    return month + ' ' + date
}