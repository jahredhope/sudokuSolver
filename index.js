const puzzles = [
  '6x9x5x1xx4312x85x95874x13xx853x7xxx4xx638472x27451xx93x12845936948637xx1365x2x487',
  'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'];

const solver = require('./solver');
const solutions = puzzles.map(solver);
