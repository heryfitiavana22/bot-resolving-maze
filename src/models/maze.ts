import { Cell, Coordinate, MazeTable } from "../types/data-types";

export class Maze {
  constructor(private maze: MazeTable) {}

  public get = () => {
    return this.maze;
  };

  public set = (maze: MazeTable) => {
    this.maze = maze;
  };

  public getCell = ([row, col]: Coordinate) => {
    return this.maze[row][col]
  }

  public setCell = ([row, col]: Coordinate, value: Cell) => {
    this.maze[row][col] = value;
  }

  public getStart = (): Coordinate => {
    for (let i = 0; i < this.maze.length; i++) {
      for (let j = 0; j < this.maze[i].length; j++) {
        if (this.maze[i][j] === "S") {
          return [i, j];
        }
      }
    }
    throw new Error("MazeTable has not entry");
  };
}
