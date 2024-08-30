import { DIRECTIONS } from "../constants";
import { Subscriber } from "../helpers/subscriber";
import { Maze } from "../models/maze";
import { Coordinate, MazeTable, Path } from "../types/data-types";

export type SubscriberMaze = {
  nextPosition: Coordinate;
  path: Path;
  finished: boolean;
};

export abstract class MazeSolver extends Subscriber<SubscriberMaze> {
  protected partialMaze: Maze;
  protected visited: boolean[][];
  protected path: Path;
  protected finished: boolean;
  protected start: Coordinate;

  constructor(protected fullMaze: Maze) {
    super();
    this.fullMaze = fullMaze;
    this.start = fullMaze.getStart();
    this.path = [];
    this.finished = false;
    this.partialMaze = new Maze([]);
    this.initializePartialMaze(this.start);
    this.visited = Array.from({ length: fullMaze.get().length }, () =>
      Array(fullMaze.get()[0].length).fill(false)
    );
  }

  initializePartialMaze([startRow, startCol]: Coordinate) {
    const partialMaze: MazeTable = this.fullMaze
      .get()
      .map((row) => row.map(() => "?"));
    partialMaze[startRow][startCol] = this.fullMaze.getCell([
      startRow,
      startCol,
    ]);
    this.partialMaze.set(partialMaze);
    this.revealNeighbors(startRow, startCol);
  }

  revealNeighbors(x: number, y: number) {
    for (const [dx, dy] of DIRECTIONS) {
      const nx = x + dx;
      const ny = y + dy;

      if (
        nx >= 0 &&
        ny >= 0 &&
        nx < this.fullMaze.get().length &&
        ny < this.fullMaze.get()[0].length
      ) {
        this.partialMaze.setCell([nx, ny], this.fullMaze.getCell([nx, ny]));
      }
    }
  }

  abstract solve(): Promise<boolean>;

  public getPath = () => {
    return this.path;
  };

  public isFinished = () => {
    return this.finished;
  };
}
