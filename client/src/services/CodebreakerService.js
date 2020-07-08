import {serverURL} from "@/serverURL.js"

const baseURL = serverURL + "/api/"
const cards = "preplaycards"
const words = "words"
const gameStatus = "gamestatus"

export default {
    getCards() {
        return fetch(baseURL+cards)
        .then(res => res.json())
    },

    getWords() {
        return fetch(baseURL+words)
        .then(res => res.json())
        // delay: 200
    },

    getGameStatus() {
        return fetch(baseURL+gameStatus)
        .then(res => res.json())
    },

    updateGameStatus(payload) {
        const id = payload._id
        return fetch(baseURL+gameStatus+"/"+id, {
            method: 'PUT',
            body: JSON.stringify(payload),
            headers: { "Content-Type": "application/json"}
    })
        .then(res => res.json())       
    }
}