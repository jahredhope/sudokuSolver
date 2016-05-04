module.exports = function solve(str) {
  var done = false;
  const locationKeys = [0,1,2,3,4,5,6,7,8];
  const all = '123456789';
  const options = [[], [], [], [], [], [], [], [], []].map(() => [all,all,all,all,all,all,all,all,all]);

  function base3rd(r) {return Math.floor(r/3)*3;}
  function r3(i) {return i%3;}
  function c3(i) {return Math.floor(i/3);}
  function r9(i) {return i%9;}
  function c9(i) {return Math.floor(i/9);}

  function place(r,c,v) {
    // console.log(`Placing ${v} at ${r}|${c}`);
    options[r][c] = v;
    locationKeys.forEach(i=>remove(i,c,v));
    locationKeys.forEach(i=>remove(r,i,v));
    locationKeys.forEach(i=> {
      remove(base3rd(r)+r3(i), base3rd(c)+c3(i), v)
    });
  }

  function remove(r,c,v) {
    // console.log('removing', r,c, options[r][c]);
    if( typeof options[r][c] === 'string') {
      options[r][c] = options[r][c].replace(v,'');
    }
  }

  function printGrid() {
    var printedGrid = 'GRID\n';
    options.forEach((row)=> {
      row.forEach((cell) => {
        printedGrid += (typeof cell === 'number' ? cell : ' ');
      })
      printedGrid += '\n';
    });
    console.log(printedGrid);
  }

  function checkThatShahizle() {
    var solvedCount = 0;
    var solutionsFoundThisRun = 0;
    locationKeys.forEach(r => {
      locationKeys.forEach(c => {
        var v = options[r][c];
        if(typeof v !== 'number') {
          if(v.length === 1) {
            solutionsFoundThisRun++;
            place(r,c,parseInt(v));
          }
        } else {
          solvedCount++;
        }
      });
    });
    if(solvedCount === 81) {
      console.log("WE DONE!!!!");
      done = true;
    } else if(solutionsFoundThisRun === 0) {
      console.log("I can't solve this :(");
      done = true;
    }
    // printGrid();
  }

  str.split('').map((c,i) => {
    if(/\d/.test(c)) {
      place(c9(i),r9(i),parseInt(c));
    }
  });
  while(!done) {
    checkThatShahizle();
  }
  printGrid();
  return(options);
};
