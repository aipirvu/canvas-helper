export class Shape {
  constructor(
    public readonly id: string,
    public readonly zIndex = 0,
    public readonly scaleOnZoomChange = false
  ) {
  }
}
