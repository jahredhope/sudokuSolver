function base3rd(r) {return Math.floor(r/3)*3;}
function r3(i) {return i%3;}
function c3(i) {return Math.floor(i/3);}
function r9(i) {return i%9;}
function c9(i) {return Math.floor(i/9);}

module.exports = function solve(str) {
  var done = false;
  var solved = false;
  var foundFromOnly = 0;
  var foundFromRows = 0;
  var foundFromCols = 0;
  var foundFromGroup = 0;

  const all = '123456789';
  const locationKeys = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  const keys = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const groSel  = [0,0,0,1,1,1,2,2,2,0,0,0,1,1,1,2,2,2,0,0,0,1,1,1,2,2,2,3,3,3,4,4,4,5,5,5,3,3,3,4,4,4,5,5,5,3,3,3,4,4,4,5,5,5,6,6,6,7,7,7,8,8,8,6,6,6,7,7,7,8,8,8,6,6,6,7,7,7,8,8,8];
  const colSel  = [0,1,2,3,4,5,6,7,8,0,1,2,3,4,5,6,7,8,0,1,2,3,4,5,6,7,8,0,1,2,3,4,5,6,7,8,0,1,2,3,4,5,6,7,8,0,1,2,3,4,5,6,7,8,0,1,2,3,4,5,6,7,8,0,1,2,3,4,5,6,7,8,0,1,2,3,4,5,6,7,8];
  const rowSel   = [0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,2,2,2,2,2,2,2,2,2,3,3,3,3,3,3,3,3,3,4,4,4,4,4,4,4,4,4,5,5,5,5,5,5,5,5,5,6,6,6,6,6,6,6,6,6,7,7,7,7,7,7,7,7,7,8,8,8,8,8,8,8,8,8];
  const groupStarts = [0, 3, 6, 27, 30, 33, 54, 57, 60];
  const cellStarts = [0, 1, 2, 9, 10, 11, 18, 19, 20];

  const full = (new Array(81)).fill(all,0,81);

  const rows = locationKeys.map(rowNo => locationKeys.map(cellNo => (rowNo * 9) + cellNo));
  const cols = locationKeys.map(colNo => locationKeys.map(cellNo => (cellNo * 9) + colNo))
  const groups = locationKeys.map(groupNo => locationKeys.map(cellNo => groupStarts[groupNo] + cellStarts[cellNo]))


  const options = [[], [], [], [], [], [], [], [], []].map(() => [all,all,all,all,all,all,all,all,all]);


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
  return(options);
};
