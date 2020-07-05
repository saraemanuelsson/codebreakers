const baseURL = 'http://localhost:3000/api/'
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
        console.log(payload);
        
        return fetch(baseURL+gameStatus+"/"+payload._id, {
            method: 'PUT',
            body: JSON.stringify(payload),
            headers: { "Content-Type": "application/json"}
    })
        .then(res => res.json())       
    }
}