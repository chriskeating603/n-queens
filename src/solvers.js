/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



window.findNRooksSolution = function(n) {
  var board = new Board({n:n});
  var solution = board.rows();
  for (var i = 0; i < solution.length; i++) {
    for (var j = 0; j < solution.length; j++) {
      solution[i][j] = 1;
      if (board.hasAnyRooksConflicts()) {
        solution[i][j] = 0;
      }
    }
  }
  // console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
 var solution = 1
 for (var i = 1; i<=n; i++){
  solution = solution * i
 }

 return solution 
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  // if (n > 3) {
    var rowIndex = Math.floor((Math.random * (n-4)) + 4)
    console.log(rowIndex)
    var board = new Board({n:n});
    var solution = board.rows();
    for (var i = 0; i < solution.length; i++) {
      for (var j = 0; j < solution.length; j++) {
        solution[i][j] = 1;
        if (board.hasAnyQueensConflicts()) {
          solution[i][j] = 0;
        }
      }
    }
    console.log('solution is ' + JSON.stringify(solution))
    return solution;
    var rowIndex = Math.floor((Math.random * (n-4)) + 4)
    console.log(solution)
    // } else {
    //   return false;
    // }
  // console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  // var board = new Board({n:n});
  // var solution = board.rows();
  // for (var i = 0; i < solution.length; i++) {
  //   for (var j = 0; j < solution.length; j++) {
  //     console.log(solution)
  //     solution[i+1][j] = 1;
  //     if (board.hasAnyQueensConflicts()) {
  //       console.log('hello')
  //       solution[i+1][j] = 0;
  //     }
  //   }
  // }
  // console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  // return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme
var rowIndex = Math.floor((Math.random * (n-4)) + 4)
    console.log(rowIndex)
  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
