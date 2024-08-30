import { Maze } from "../models/maze";
import { BFSMazeSolver } from "./bfs.maze-solver";
import { DFSMazeSolver } from "./dfs-maze-solver";
import { MazeSolver } from "./maze-solver";

export class SolverFactory {
  static algorithm({ type, maze }: FactoryParams): MazeSolver {
    if (type == AlgoSolver.DFS) {
      return new DFSMazeSolver(maze);
    }
    if (type == AlgoSolver.BFS) {
      return new BFSMazeSolver(maze);
    }
    throw new Error("Unknown algorithm");
  }
}

export enum AlgoSolver {
  DFS = "DFS",
  BFS = "BFS",
}

type FactoryParams = {
  type: AlgoSolver;
  maze: Maze;
};
