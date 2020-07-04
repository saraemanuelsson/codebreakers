const baseURL = 'http://localhost:3000/api/'
const cards = "cards"
const words = "words"

export default {
    getCards() {
        return fetch(baseURL+cards)
        .then(res => res.json())
    },

    getWords() {
        return fetch(baseURL+words)
        .then(res => res.json())
    }
}