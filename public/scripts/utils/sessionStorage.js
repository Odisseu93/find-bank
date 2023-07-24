/* eslint-disable no-undef */
const set = (key, data) => sessionStorage[key] = JSON.stringify(data)

const get = (key) => JSON.parse(sessionStorage[key])

/**
 set and get utility functions for session storage
 */
export const ss = { set, get }