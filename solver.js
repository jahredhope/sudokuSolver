module.exports = function solve(str) {
  var done = false;
  var solved = false;
  var foundFromOnly = 0;
  var foundFromRows = 0;
  var foundFromCols = 0;
  var foundFromGroup = 0;

  const full = (new Array(81)).fill('123456789',0,81);

  const keys = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const groSel  = [
    0,0,0,1,1,1,2,2,2,0,0,0,1,1,1,2,2,2,0,0,0,1,1,1,2,2,2,
    3,3,3,4,4,4,5,5,5,3,3,3,4,4,4,5,5,5,3,3,3,4,4,4,5,5,5,
    6,6,6,7,7,7,8,8,8,6,6,6,7,7,7,8,8,8,6,6,6,7,7,7,8,8,8];
  const colSel  = [
    0,1,2,3,4,5,6,7,8,0,1,2,3,4,5,6,7,8,0,1,2,3,4,5,6,7,8,
    0,1,2,3,4,5,6,7,8,0,1,2,3,4,5,6,7,8,0,1,2,3,4,5,6,7,8,
    0,1,2,3,4,5,6,7,8,0,1,2,3,4,5,6,7,8,0,1,2,3,4,5,6,7,8];
  const rowSel   = [
    0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,2,2,2,2,2,2,2,2,2,3,3,3,3,3,3,3,3,3,
    4,4,4,4,4,4,4,4,4,5,5,5,5,5,5,5,5,5,6,6,6,6,6,6,6,6,6,
    7,7,7,7,7,7,7,7,7,8,8,8,8,8,8,8,8,8];

  const rows = [
    [0, 1, 2, 3, 4, 5, 6, 7, 8],
    [9, 10, 11, 12, 13, 14, 15, 16, 17],
    [18, 19, 20, 21, 22, 23, 24, 25, 26],
    [27, 28, 29, 30, 31, 32, 33, 34, 35],
    [36, 37, 38, 39, 40, 41, 42, 43, 44],
    [45, 46, 47, 48, 49, 50, 51, 52, 53],
    [54, 55, 56, 57, 58, 59, 60, 61, 62],
    [63, 64, 65, 66, 67, 68, 69, 70, 71],
    [72, 73, 74, 75, 76, 77, 78, 79, 80]
  ];

  const cols = [
    [0, 9, 18, 27, 36, 45, 54, 63, 72],
    [1, 10, 19, 28, 37, 46, 55, 64, 73],
    [2, 11, 20, 29, 38, 47, 56, 65, 74],
    [3, 12, 21, 30, 39, 48, 57, 66, 75],
    [4, 13, 22, 31, 40, 49, 58, 67, 76],
    [5, 14, 23, 32, 41, 50, 59, 68, 77],
    [6, 15, 24, 33, 42, 51, 60, 69, 78],
    [7, 16, 25, 34, 43, 52, 61, 70, 79],
    [8, 17, 26, 35, 44, 53, 62, 71, 80]
  ];

  const groups = [
    [0, 1, 2, 9, 10, 11, 18, 19, 20],
    [3, 4, 5, 12, 13, 14, 21, 22, 23],
    [6, 7, 8, 15, 16, 17, 24, 25, 26],
    [27, 28, 29, 36, 37, 38, 45, 46, 47],
    [30, 31, 32, 39, 40, 41, 48, 49, 50],
    [33, 34, 35, 42, 43, 44, 51, 52, 53],
    [54, 55, 56, 63, 64, 65, 72, 73, 74],
    [57, 58, 59, 66, 67, 68, 75, 76, 77],
    [60, 61, 62, 69, 70, 71, 78, 79, 80]
  ];

  function place(l,v) {
    // console.log(`Placing ${v} at ${l}`);
    function rem(l) {
      if( typeof full[l] === 'string') {
        full[l] = full[l].replace(v,'');
      }
    }
    full[l] = v;
    rows[rowSel[l]].forEach(rem);
    cols[colSel[l]].forEach(rem);
    groups[groSel[l]].forEach(rem);
  }

  function printGrid() {
    console.log('PRINT GRID');
    var result = '';
    full.forEach((cell, index) => {
      // console.log(index%9);
      if(typeof cell === 'number') {
        result += cell.toString();
      } else {
        result += '-';
      }
      result += (((index+1) % 9) ? ' ' : '\n');
    });
    console.log(result);
  }

  function checkThatShahizle() {
    var solvedCount = 0;
    var solutionsFoundThisRun = 0;
    full.forEach((cell, index) => {
      var v = full[index];
      if(typeof v !== 'number') {
        if(v.length === 1) {
          solutionsFoundThisRun++;
          foundFromOnly++;
          place(index,parseInt(v));
        }
      } else {
        solvedCount++;
      }
    });


    groups.forEach(group => {
      keys.forEach(key => {
        var gLoc = -1;
        var found = group.some(l => {
          if(typeof full[l] === 'string' && full[l].includes(key)) {
            if(gLoc == -1) {
              gLoc = l;
            } else {
              return true;
            }
          }
          return false;
        });
      if(!found && gLoc !== -1) {
        solutionsFoundThisRun++;
        foundFromGroup++;
        place(gLoc, key);
      }
      });
    });
    rows.forEach(group => {
      keys.forEach(key => {
        var gLoc = -1;
        var found = group.some(l => {
          if(typeof full[l] === 'string' && full[l].includes(key)) {
            if(gLoc == -1) {
              gLoc = l;
            } else {
              return true;
            }
          }
          return false;
        });
      if(!found && gLoc !== -1) {
        solutionsFoundThisRun++;
        foundFromRows++;
        place(gLoc, key);
      }
      });
    });
    cols.forEach(column => {
      keys.forEach(key => {
        var gLoc = -1;
        var found = column.some(l => {
          if(typeof full[l] === 'string' && full[l].includes(key)) {
            if(gLoc == -1) {
              gLoc = l;
            } else {
              return true;
            }
          }
          return false;
        });
      if(!found && gLoc !== -1) {
        foundFromCols++;
        solutionsFoundThisRun++;
        place(gLoc, key);
      }
      });
    });

    if(solvedCount === 81) {
      solved = true;
      done = true;
    } else if(solutionsFoundThisRun === 0) {
      done = true;
    }
    // printGrid();
  }

  str.split('').map((c,i) => {
    if(/\d/.test(c)) {
      place(i,parseInt(c));
    }
  });
  printGrid();

  while(!done) {
    checkThatShahizle();
  }

  printGrid();
  console.log(`${solved ? 'Solved' : 'Unsolved'} from: Only:${foundFromOnly} Columns:${foundFromCols} Rows:${foundFromRows} Groups:${foundFromGroup}`);
  return(full);
};
