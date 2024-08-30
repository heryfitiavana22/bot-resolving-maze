import { MazeHelper } from "../helpers/maze-helper";
import { sleep } from "../helpers/utils";
import { SubscriberMaze } from "../solver/maze-solver";
import { Coordinate, Path } from "../types/data-types";

export class Player {
  private playerElement: HTMLElement;
  private position: Coordinate;
  private cellSize: number;
  private prevPath: Path = [];

  constructor(startPosition: Coordinate, cellSize: number) {
    this.playerElement = document.getElementById("player")!;
    this.position = startPosition;
    this.cellSize = cellSize;
    this.updatePlayerPosition();
  }

  private updatePlayerPosition = async () => {
    const [x, y] = this.position;
    this.playerElement.style.transform = `translate(${y * this.cellSize}px, ${
      x * this.cellSize
    }px)`;
  };

  public moveTo = async (targetPosition: Coordinate) => {
    this.position = targetPosition;
    await sleep();
    await this.updatePlayerPosition();
  };

  public onNewPosition = async ({ nextPosition, path }: SubscriberMaze) => {
    console.log("Position", this.position);
    console.log("next Position", nextPosition);

    if (MazeHelper.isPositionNeighbor(this.position, nextPosition)) {
      await this.moveTo(nextPosition);
    } else {
      if (
        MazeHelper.isMovingBackward({ from: this.position, to: nextPosition })
      ) {
        await this.moveBackward(path, this.prevPath);
      } else {
        await this.moveForward(path, this.prevPath);
      }
    }
    this.prevPath = [...path];
  };

  public moveBackward = async (path: Path, prevPath: Path) => {
    const commonPointIndex = this.findCommonPointIndex(path, prevPath);

    for (let i = prevPath.length - 1; i >= commonPointIndex; i--) {
      await this.moveTo(prevPath[i]);
    }

    for (let i = commonPointIndex + 1; i < path.length; i++) {
      await this.moveTo(path[i]);
    }
  };

  public moveForward = async (path: Path, prevPath: Path) => {
    let divergenceIndex = this.findDivergenceIndex(path, prevPath);

    if (divergenceIndex >= 0) {
      for (let i = prevPath.length - 1; i >= divergenceIndex; i--) {
        await this.moveTo(prevPath[i]);
      }
    }

    if (divergenceIndex == -1) divergenceIndex = 0;

    for (let i = divergenceIndex; i < path.length; i++) {
      await this.moveTo(path[i]);
    }
  };

  private findCommonPointIndex(path: Path, prevPath: Path): number {
    for (let i = prevPath.length - 1; i >= 0; i--) {
      const prevPoint = prevPath[i];
      for (let j = 0; j < path.length; j++) {
        const pathPoint = path[j];
        if (prevPoint[0] === pathPoint[0] && prevPoint[1] === pathPoint[1]) {
          return i;
        }
      }
    }
    return -1;
  }

  private findDivergenceIndex(path: Path, prevPath: Path): number {
    for (let i = 0; i < prevPath.length; i++) {
      const prevPoint = prevPath[i];
      if (
        i >= path.length ||
        prevPoint[0] !== path[i][0] ||
        prevPoint[1] !== path[i][1]
      ) {
        return i - 1;
      }
    }
    return prevPath.length - 1;
  }
}
