import {Point} from "./point";
import {Shape} from "./shape";

export class CanvasData {
  public readonly context: CanvasRenderingContext2D;
  public readonly center: Point;
  public translate: Point = new Point(0, 0);
  private zoom = 1;
  private translateMultiplier = 1;
  private readonly shapes: Array<Shape> = new Array<Shape>();

  constructor(public readonly canvasElement: HTMLCanvasElement) {
    const context = canvasElement.getContext("2d");
    if (!context) {
      throw new Error("Canvas context could not be obtained.");
    }
    this.context = context;
    this.center = new Point(canvasElement.clientWidth / 2, canvasElement.clientHeight / 2);
  }

  addShape(shape: Shape) {
    this.shapes.push(shape);
  }

  getShapes(): Array<Shape> {
    return Object.assign(new Array<Shape>(), this.shapes);
  }

  zoomIn(): void {
    this.zoom += this.zoom * .1;
    this.translateMultiplier -= this.translateMultiplier * .2
  }

  zoomOut(): void {
    this.zoom -= this.zoom * .1;
    this.translateMultiplier += this.translateMultiplier * .2
  }

  getZoom(): number {
    return this.zoom;
  }

  getTranslateMultiplier(): number {
    return this.translateMultiplier;
  }
}
