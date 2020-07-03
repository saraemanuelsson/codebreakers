# JavaScript Project Brief - Browser Game [Codebreakers]

Create a browser game based on an existing card or dice game. Model and test the game logic and then display it in the browser for a user to interact with.

Write your own MVP with some specific goals to be achieved based on the game you choose to model.

You might use persistence to keep track of the state of the game or track scores/wins. Other extended features will depend on the game you choose.

## MVP

* Build game mechanics - Turn based
* Each of this card has a colour property
* Shuffle cards to get a colour map in their back side [abstract/plain colours] and a random set of words in their front side.
* Pass and play
* Have the state of the game saved
* Handle team currently in play (incorrect guess handled by app, end of turn     otherwise handled by user)


## Extensions

* Multiplayer: use socket.io
   - Usernames/nicknames
* Option: Play with either images or words.
* Separate map for codemaster rather than colours of cards
* Turns Timer
* Track rounds


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