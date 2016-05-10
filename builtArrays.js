const keys = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const size = keys.length;
const groupSize = Math.sqrt(size);

const locationKeys = keys.map((v,i)=>i);

const cellStarts = []; // 0, 1, 2, 9, 10, 11, 18, 19, 20
const groupStarts = []; // 0, 3, 6, 27, 30, 33, 54, 57, 60
for (var i = 0; i < groupSize; i++) {
  for (var j = 0; j < groupSize; j++) {
    cellStarts.push(groupSize*groupSize*i+j);
    groupStarts.push(groupSize*groupSize*groupSize*i+j*groupSize);
  }
}

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

module.exports = {
  rows: locationKeys.map(rowNo => locationKeys.map(cellNo => (rowNo * 9) + cellNo)),
  cols: locationKeys.map(colNo => locationKeys.map(cellNo => (cellNo * 9) + colNo)),
  groups: locationKeys.map(groupNo => locationKeys.map(cellNo => groupStarts[groupNo] + cellStarts[cellNo])),
  locationKeys,
  groupStarts,
  cellStarts,
  groSel,
  colSel,
  rowSel
};
