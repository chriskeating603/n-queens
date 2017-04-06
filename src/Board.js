// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


/*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex) {
      var sum = 0
      var board = this.rows()
      for(var i=0; i<board[rowIndex].length; i++){
        sum = sum + board[rowIndex][i]
      }
      if (sum>1){
        return true
      } else {
        return false
      }
    },

  hasAnyRowConflicts: function() {
    var result = false;
    var board = this.rows()
    for(var i = 0; i < board.length; i++) {
      result = result || this.hasRowConflictAt(i)
    }
      return result;
  },


    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      var sum = 0
      var board = this.rows()
      for(var i =0; i < board.length; i++){
        sum = sum + board[i][colIndex]
      }
      if (sum > 1) {
        return true
      } else {
        return false
      }
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      var board = this.rows()
      var result = false;
      for(var i = 0; i < board.length; i++) {
        result = result || this.hasColConflictAt(board,i)
      }
      return result;
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
     hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
      var board = this.rows();
      var sum = 0;
      var arg = majorDiagonalColumnIndexAtFirstRow

      
      if (arg >= 0){
        var bLength = board.length-arg
        for(var i =0; i<bLength; i++){
          sum = sum + board[i][arg]
          arg++
        }
      } else {
        var cLength = board.length+arg
        var loc = Math.abs(arg)
        for(var j =0; j<cLength; j++){
          sum = sum + board[loc][j]
          loc++
        }
      }
       if (sum > 1) {
        return true
      } else {
        return false
      }
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      var board = this.rows()
      var bLength = board.length
      var result = false

      for(var i = -bLength+2; i<bLength-2; i++ ){
        result = result || this.hasMajorDiagonalConflictAt(i)
      }

      return result
      
    },


    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      var board = this.rows();
      var sum = 0;
      var arg = minorDiagonalColumnIndexAtFirstRow;
      var rowIndex;
      var colIndex;
      // if argument is less than equal to array length - 1
      if (arg < board.length) {
        // row index is 0 and col index is arg
        rowIndex = 0;
        colIndex = arg;
          for (var i = rowIndex; i < arg + 1; i++) {
            if (board[i][colIndex] !== undefined) {
              sum += board[i][colIndex];
            }
            colIndex--;
          }
      } else {
        colIndex = board.length - 1;
        rowIndex = arg - (board.length -1);
        for (var i = rowIndex; i < arg - (arg - board.length); i++) {
          if (board[i][colIndex] !== undefined) {
            sum += board[i][colIndex];
          }
          colIndex--;
        }
      }
      
      if (sum > 1) {
        return true
      } else {
        return false
      }

      // if arg is greater array .legnth - 1
        // col location is 3 & row loc is arg - array.length - 1
      // iterate through board with defined vars
        // increment row
        // decrement column
      // return value at all locations
      // if sum is greater than 1
        // return false
      // else 
        //return true





      // return false; // fixme
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      var board = this.rows();
      var bLength = board.length;
      var result = false;

      for (var i = bLength + 1; i > 0; i--) {
        result = result || this.hasMinorDiagonalConflictAt(i);
      }

      return result;
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());
