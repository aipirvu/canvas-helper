import {Injectable} from '@angular/core';
import {Shape} from "../models/shape";
import {Polygon} from "../models/polygon";
import {Point} from "../models/point";
import {CanvasData} from "../models/canvas-data";

@Injectable({
  providedIn: 'root'
})
export class CanvasService {

  constructor() {
  }

  getContext(canvasId: string): CanvasData {
    const element = document.getElementById(canvasId);
    if (element instanceof HTMLCanvasElement) {
      const canvas = <HTMLCanvasElement>element;
      return new CanvasData(canvas);
    }
    throw new Error("Selected DOM element is not a canvas. Could not make binding.");
  }

  draw(canvasData: CanvasData): void {
    canvasData.context.clearRect(0, 0, canvasData.center.x * 2, canvasData.center.y * 2);
    for (const shape of canvasData.getShapes())
      if (shape instanceof Polygon) {
        this.drawPolygon(canvasData, shape);
      }
  }

  private drawPolygon(canvasData: CanvasData, polygon: Polygon): void {
    const firstPoint = polygon.points[0];
    canvasData.context.lineWidth = 1;
    canvasData.context.beginPath();
    this.moveToPoint(canvasData, firstPoint);
    for (let index = 1; index < polygon.points.length; index++) {
      const point = polygon.points[index];
      this.lineToPoint(canvasData, point);
    }
    this.lineToPoint(canvasData, firstPoint);
    canvasData.context.stroke();
  }

  private moveToPoint(canvasData: CanvasData, point: Point): void {
    canvasData.context.moveTo(
      point.x * canvasData.getZoom() + canvasData.center.x,
      point.y * canvasData.getZoom() + canvasData.center.y
    );
  }

  private lineToPoint(canvasData: CanvasData, point: Point): void {
    canvasData.context.lineTo(
      point.x * canvasData.getZoom() + canvasData.center.x,
      point.y * canvasData.getZoom() + canvasData.center.y
    );
  }
}
