
import store from 'store'

export const setItem = value=>{if(value && typeof value !=='function'){store.set('user',value) }}

export const getItem = () =>{ return store.get('user') || ''}

export const remItem = (value) => store.remove('user')

