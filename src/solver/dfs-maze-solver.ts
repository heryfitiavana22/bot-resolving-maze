import { DIRECTIONS } from "../constants";
import { MazeSolver } from "./maze-solver";

export class DFSMazeSolver extends MazeSolver {
  async solve() {
    const start = this.start;
    if (start) {
      const [x, y] = start;
      return await this.dfs(x, y);
    }
    return false;
  }

  private async dfs(x: number, y: number) {
    if (
      x < 0 ||
      y < 0 ||
      x >= this.partialMaze.get().length ||
      y >= this.partialMaze.get()[0].length ||
      this.partialMaze.getCell([x, y]) === "0" ||
      this.visited[x][y]
    ) {
      return false;
    }

    this.visited[x][y] = true;
    this.path.push([x, y]);
    await this.notify({
      path: [...this.path],
      nextPosition: [x, y],
      finished: this.finished,
    });

    if (this.partialMaze.getCell([x, y]) === "E") {
      this.finished = true;
      return true;
    }

    this.revealNeighbors(x, y);

    for (const [dx, dy] of DIRECTIONS) {
      if (await this.dfs(x + dx, y + dy)) {
        return true;
      }
    }

    this.path.pop();
    return false;
  }
}
