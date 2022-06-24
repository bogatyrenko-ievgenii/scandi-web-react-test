export const deepObjectCopy = (object) => {
    return JSON.parse(JSON.stringify(object))
}