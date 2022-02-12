import {Shape} from "./shape";
import {Point} from "./point";

export class Polygon extends Shape {
  public constructor(
    public readonly points: Array<Point>,
    zIndex = 0,
    scaleOnZoomChange = false,
    id: string
  ) {
    super(id, zIndex, scaleOnZoomChange);
  }
}
