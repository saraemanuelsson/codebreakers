# JavaScript Project Brief - Browser Game [Codebreakers]

Create a browser game based on an existing card or dice game. Model and test the game logic and then display it in the browser for a user to interact with.

Write your own MVP with some specific goals to be achieved based on the game you choose to model.

You might use persistence to keep track of the state of the game or track scores/wins. Other extended features will depend on the game you choose.

## MVP

* Build game mechanics, should be pass and play, i.e. players will take turns looking at the screen
* Game should have 25 cards and each card should have a colour property
* The cards need to be assigned a random word from a large word collection and then the cards need to be shuffled
* Guessers should be able to click a card which will reveal the colour of the card
* CodeBreakers should be able to click on a button to reveal the colour of all cards
* Save game state in database and allow for game to be resumed
* Handle team currently in play: Incorrect guess will end the turn otherwise the team will use the end turn button.


## Extensions

* Make it multiplayer instead of pass and play, using sockets.io
   - Let users join with a username/nickname
* Add option to play with pictures instead of words
* Build a separate colour map only visible for the CodeBreaker instead of revealing the colour of the cards
* Have a timer that will end the turn if it runs out of time before the team has guessed or ended their turn.


## Resources
https://socket.io/
https://ngrok.com/
https://www.textlocal.com/
https://www.vonage.co.uk/
https://picsum.photos/
https://boardgamegeek.com/thread/1383878/word-list-future-moderators-codenames-games
https://javascript.info/task/shuffle

## Planning 

### Scrum/Agile

![ScrumFramework](/documentation/images/ScrumFrameworkTest.png)

#### Scrum Roles
1. All team members became PO's during `Sprint Planning`.
The goal is to consider the current state of the app with the wider perspective possible.
2. Every sprint will be assigned with a `Scrum Master` at `Sprint Planning`. This person will run the `Daily Scrum` and be responsible of remaing the team to follow the scrum artifacts agreed in advance.

#### Sprint Planning
1. Whole team involved.
2. Pick items from backlog
3. Pull > Push

#### Daily Scrum
1. Quick (5-10mins)
2. Report on:
   * Yesterday
   * Today
   * Blockers
   * Availability
3. Don't solve problems
#### Sprint Retrospective
1. Member team reviews of sprint
2. What went well/didn't go well/ could be improved
3. Start/stop/continue
