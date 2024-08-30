import { DIRECTIONS } from "../constants";
import { Coordinate, Path } from "../types/data-types";
import { MazeSolver } from "./maze-solver";

export class BFSMazeSolver extends MazeSolver {
  async solve() {
    const start = this.start;
    if (!start) return false;

    const queue: [Coordinate, Path][] = [[start, [start]]];
    this.visited[start[0]][start[1]] = true;

    while (queue.length > 0) {
      const [[x, y], currentPath] = queue.shift()!;

      if (this.partialMaze.getCell([x, y]) === "E") {
        this.path = currentPath;
        this.finished = true;
        return true;
      }

      this.revealNeighbors(x, y);

      for (const [dx, dy] of DIRECTIONS) {
        const nx = x + dx;
        const ny = y + dy;

        if (
          nx >= 0 &&
          ny >= 0 &&
          nx < this.partialMaze.get().length &&
          ny < this.partialMaze.get()[0].length &&
          this.partialMaze.getCell([nx, ny]) !== "0" &&
          !this.visited[nx][ny]
        ) {
          this.visited[nx][ny] = true;
          const path: Path = [...currentPath, [nx, ny]];
          const nextPosition: Coordinate = [nx, ny];

          if (!this.finished)
            await this.notify({ path, nextPosition, finished: this.finished });
          queue.push([nextPosition, path]);

          if (this.partialMaze.getCell([nx, ny]) === "E") {
            this.path = path;
            this.finished = true;
          }
        }
      }
    }

    return false;
  }
}
