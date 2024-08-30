import { CELL_SIZE } from "../constants";
import { Maze } from "./maze";

export class TableGame {
  constructor(private maze: Maze) {}

  public render = () => {
    const mazeContainer = document.getElementById("maze");
    if (!mazeContainer) {
      return;
    }
    mazeContainer.innerHTML = "";
    const column = this.maze.get()[0].length || 0;
    mazeContainer.style.gridTemplateColumns = `repeat(${column}, ${CELL_SIZE}px)`;

    this.maze.get().forEach((row) => {
      row.forEach((cell) => {
        const cellElement = document.createElement("div");
        cellElement.classList.add("cell");
        if (cell === "0") {
          cellElement.classList.add("wall");
        } else if (cell === "S") {
          const playerElement = document.createElement("div");
          playerElement.classList.add("player");
          playerElement.id = "player";
          cellElement.appendChild(playerElement);
        }
        mazeContainer.appendChild(cellElement);
      });
    });
  };
}
