const puzzles = [
  '6x9x5x1xx4312x85x95874x13xx853x7xxx4xx638472x27451xx93x12845936948637xx1365x2x487',
  'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
  'xxx2xxx633xxxx54x1xx1xx398xxxxxxxx9xxxx538xxxx3xxxxxxxx263xx5xx5x37xxxx847xxx1xxx', // http://www.puzzles.ca/sudoku_puzzles/sudoku_hard_121.html http://www.puzzles.ca/sudoku_puzzles/sudoku_hard_121_solution.html
  `5xx127xx8xxxxxxx2xx39xxxxxxx4xx7x6xxxx6xxxxx28xxx3xxx9xx57xxxxxxxx4xx58x17xx9x3xx`,
  `2x9xx8x7xxxx5xxx6x7xxxxxxxx5xxxxx9xxxx73xxxx2xxxxx63x7x2xx6xxxxxxx8x1xx3x8xxx7x5x`, // http://www.puzzles.ca/sudoku_puzzles/sudoku_hard_221.html http://www.puzzles.ca/sudoku_puzzles/sudoku_hard_221_solution.html
  `8xxx2x3571xxxxx89xx6x7x91xx5xxx18xx92x6xxxxxxxxx56xxxxxxx4xx78xxxxx51x3xx5x8x764x`]; // http://www.puzzles.ca/sudoku_puzzles/sudoku_medium_069.html http://www.puzzles.ca/sudoku_puzzles/sudoku_medium_069_solution.html


const solver = require('./solver');
// const solution = solver(puzzles[3]);
const solutions = puzzles.map(solver);
