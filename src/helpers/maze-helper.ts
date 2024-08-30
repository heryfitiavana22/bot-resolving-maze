import { Coordinate } from "../types/data-types";

export class MazeHelper {
  static isPositionNeighbor = (
    position1: Coordinate,
    position2: Coordinate
  ) => {
    return (
      (position1[0] + 1 == position2[0] && position1[1] == position2[1]) ||
      (position1[0] == position2[0] && position1[1] == position2[1] + 1) ||
      (position1[0] - 1 == position2[0] && position1[1] == position2[1]) ||
      (position1[0] == position2[0] && position1[1] == position2[1] - 1)
    );
  };

  static isMovingBackward({ from, to }: IsMovingBackward) {
    return from[0] + from[1] > to[0] + to[1];
  }

}

type IsMovingBackward = {
  from: Coordinate;
  to: Coordinate;
};
