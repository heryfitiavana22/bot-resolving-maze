import "./style.css";
import { TableGame } from "./models/table-game";
import { Coordinate } from "./types/data-types";
import { Player } from "./models/player";
import { AlgoSolver, SolverFactory } from "./solver/solver-factory";
import { CELL_SIZE } from "./constants";
import { Maze } from "./models/maze";

const maze = new Maze([
  ["S", "1", "0", "0", "0", "0", "0", "0", "0", "0"],
  ["1", "1", "1", "0", "1", "1", "1", "0", "1", "1"],
  ["0", "0", "1", "0", "1", "0", "1", "0", "1", "0"],
  ["0", "0", "1", "1", "1", "0", "1", "1", "1", "0"],
  ["0", "0", "0", "0", "1", "0", "0", "0", "1", "0"],
  ["1", "1", "1", "0", "1", "1", "1", "0", "1", "0"],
  ["1", "0", "1", "0", "0", "0", "1", "0", "1", "0"],
  ["1", "0", "1", "1", "1", "1", "1", "0", "1", "0"],
  ["1", "0", "0", "0", "0", "0", "0", "0", "1", "1"],
  ["1", "1", "1", "1", "1", "1", "1", "0", "0", "E"],
]);
const start: Coordinate = [0, 0];

const tablegame = new TableGame(maze);
tablegame.render();
const player = new Player(start, CELL_SIZE);
const solver = SolverFactory.algorithm({
  maze,
  type: AlgoSolver.BFS,
});
solver.subscribe(async (params) => {
  await player.onNewPosition(params);
});
solver.solve();
