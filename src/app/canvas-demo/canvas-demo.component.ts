import {AfterViewInit, Component, OnInit} from '@angular/core';
import {CanvasService} from "../services/canvas.service";
import {Polygon} from "../models/polygon";
import {Point} from "../models/point";
import {CanvasData} from "../models/canvas-data";

@Component({
  selector: 'app-canvas-demo',
  templateUrl: './canvas-demo.component.html',
  styleUrls: ['./canvas-demo.component.css']
})
export class CanvasDemoComponent implements OnInit, AfterViewInit {

  canvasId = "my-canvas";
  canvasData?: CanvasData;

  constructor(private canvasService: CanvasService) {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.canvasData = this.canvasService.getContext(this.canvasId);

    const polygon = new Polygon(
      [new Point(-100, 100), new Point(100, 100), new Point(100, -100), new Point(-100, -100)],
      0,
      false,
      "my-square"
    )
    this.canvasData.addShape(polygon);
    this.canvasService.draw(this.canvasData);
  }


  startMoving(event: MouseEvent): void {
    const that = this;
    const canvasService = this.canvasService;
    if (!that.canvasData) {
      return;
    }
    const mouseOriginalPageX = event.pageX;
    const mouseOriginalPageY = event.pageY;
    const originalCenter = that.canvasData.center;

    const mousemoveEventListener = (mouseEvent: MouseEvent) => {
      if (!that.canvasData) {
        return;
      }
      that.canvasData.center = new Point(
        originalCenter.x + mouseEvent.pageX - mouseOriginalPageX,
        originalCenter.y + mouseEvent.pageY - mouseOriginalPageY
      );
      canvasService.draw(that.canvasData);
    }

    const mouseupEventListener = () => {
      document.removeEventListener("mousemove", mousemoveEventListener);
      document.removeEventListener("mouseup", mouseupEventListener);
    }

    document.addEventListener("mousemove", mousemoveEventListener);
    document.addEventListener("mouseup", mouseupEventListener);
  }

  startZooming(event: WheelEvent) {
    if (!this.canvasData) {
      return;
    }
    if (event.deltaY > 0) {
      this.canvasData.zoomOut();
    } else if (event.deltaY < 0) {
      this.canvasData.zoomIn()
    }
    this.canvasService.draw(this.canvasData);
  }
}
