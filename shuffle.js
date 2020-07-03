



shuffle() {
  for (let i = this.cocktails.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [this.cocktails[i], this.cocktails[j]] = [this.cocktails[j], this.cocktails[i]];
    

    [
      B, R, N, R, B,
      R, R, R, B, B,
      B, B, N, R, N,
      B, B, N, N, N,
      R, R, B, N, B
   ] 


function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
}

let arr = [1, 2, 3];
shuffle(arr);
alert(arr);