export default eventHandler(async (event) => {
    const data = await $fetch('https://evotik.com');
    return data
})