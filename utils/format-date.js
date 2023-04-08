export const formatDate = (dateString) => {
    const date = new Date(dateString)
    const day = date.toLocaleString('es-Ar', {  weekday: 'long' })
    const month = date.toLocaleString('es-Ar', {month: 'long'})
    const dayNumber = date.getDate()


    return day[0].toUpperCase() + day.slice(1).toLowerCase() + ", " + dayNumber + " de " + month[0].toUpperCase() + month.slice(1).toLowerCase()



}