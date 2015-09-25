$(document).ready(function() {
  var letters = ['a', 'b', 'c', 'd'];
  var rows = [];
  var rowCount = 4;
  var colCount = 4;
  var maxTurns = rowCount * colCount;
  var playerX = 'x';
  var playerO = 'o';
  var turn = 0;

  // when document first load
  // construct a0 a1 a2 a3 b0 ...
  for(var i = 0; i < rowCount; ++i) {
    var row = [];
    for(var j = 0; j < colCount; ++j) {
      var cell = letters[j] + i.toString();
      row.push($("." + cell));
    }
    rows.push(row);
  }

  //define whose turn it is
  $('td').on('click', function (event) {
    if (turn % 2 === 0) {
      $(this).text(playerX);
      winner = checkWin(playerX) ? playerX : '';
    } else {
      $(this).text(playerO);
      winner = checkWin(playerO) ? playerO : '';
    }

    ++turn;

    if(winner) {
      winAlert();
    } else if(turn === maxTurns) {
      winAlert();
    }

    // undo feature
    //
    // The Idea behind this is
    // instantiate an array and push the moves into that array,
    // get the last item of the array and set it equals to '' (empty string)
    // then subtract the turns by one.

    var playerMoves = [];
    var playerMove = $(event.target.innerHTML);
    playerMoves.push(playerMove);
    lastMove = playerMoves.last;

    $('.undo').on('click', function() {
     // $(event.target.innerHTML = ""); #this would wipeout all the moves.
     lastMove = "";
      --turn;
    });
  });

  var checkWin = function(checkPlayer) {
    var i = 0;
    var j = 0;

    for (i = 0; i < rowCount; ++i) {
      for (j = 0; j < colCount; ++j) {
        if(checkPlayer !== rows[i][j].text()) { // break out of row
          break;
        } else if(j === (colCount - 1)) { // WINNER!
          return true;
        }
      }
    }

    for (i = 0; i < colCount; ++i) {
      for(j = 0; j < rowCount; ++j) {
        if(checkPlayer !== rows[j][i]) {
          break;
        } else if(j === (rowCount - 1)) {
          return true;
        }
      }
    }

    //check diagnals wins
    a0 = $('.a0').html();
    a3 = $('.a3').html();
    b1 = $('.b1').html();
    b2 = $('.b2').html();
    c1 = $('.c1').html();
    c2 = $('.c2').html();
    d0 = $('.d0').html();
    d3 = $('.d3').html();

    if((a0 === b1 && a0 === c2 && a0 === d3 && (a0 === "x")) ||
       (a3 === b2 && a3 === c1 && a3 === d0 && (a3 === "x"))) {
      alert("X Wins!");
      clearBoard();
    } else if((a0 === b1 && a0 === c2 && a0 === d3 && (a0 === "o")) ||
       (a3 === b2 && a3 === c1 && a3 === d0 && (a3 === "o"))) {
      alert("O Wins!");
      clearBoard();
    }
  };

  var winAlert = function() {
    if(winner) {
      alert(winner.toUpperCase() + " Wins!");
    } else {
      alert("It's a tie!");
    }
    clearBoard();
  };

  var clearBoard = function() {
    for (var i = 0; i < rowCount; ++i) {
      for (var j = 0; j < rowCount; ++j) {
        rows[i][j].text("");
      }
    }
  	turn = 0;
    winner = "";
  };

  $('.restart').click(function(event) {
    clearBoard();
  });
});
