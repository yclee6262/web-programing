import axios from 'axios'

const instance = axios.create({ baseURL: 'http://localhost:4000/api/guess' })
console.log(instance)

const startGame_backend = async () => {
    try{
        const { data: { msg } } = await instance.post('/start')
        console.log("msg :", msg)
        return msg
    }
    catch(error) {
        throw new Error("msg posting error: "+ error)
    } 
} 

const processGuessByBackend = async (guess) => {
    try{
        const { data: { msg } } = await instance.get('/guess', { params: { guess } })
        console.log("msg :", msg)
        return msg
    }
    catch(error) {
        throw new Error(guess + 'is not valid')
    } 
    
}
    
const restart = async () => {
    try{
        const {data: {msg} } = await instance.post('/restart')
        return msg
    }
    catch(error) {
        throw new Error("msg posting error: "+ error)
    }
}


export { startGame_backend, processGuessByBackend, restart }
