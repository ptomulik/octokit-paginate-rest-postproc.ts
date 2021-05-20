//import {
//  Release,
//  SafeInputs,
//  SortSpecs,
//  SortSpec,
//  SelectSpecs,
//  SliceSpec,
//} from "./types";
//
//
//interface SlicerMethod {
//  <T>(arr: T[]): T[];
//}
//
//export class Slicer {
//  slice: SlicerMethod;
//
//  constructor(slice: SliceSpec) {
//    this.slice = Slicer.method(slice);
//  }
//
//  static method(slice: SliceSpec): SlicerMethod {
//    const count = (s: SliceSpec) =>
//      (s.type !== "F" && s.type !== "L") || s.count == null ? 1 : s.count;
//    const from = (s: SliceSpec) =>
//      s.type !== "R" || s.from == null ? 0 : s.from;
//    const to = (s: SliceSpec) =>
//      s.type !== "R" || s.to == null ? undefined : 1 + s.to;
//
//    if (slice == null) {
//      return <T>(arr: T[]) => arr;
//    }
//
//    switch (slice.type) {
//      case "F":
//        return <T>(arr: T[]) => arr.slice(0, count(slice));
//      case "L":
//        return <T>(arr: T[]) =>
//          arr.slice(arr.length - count(slice), arr.length);
//      case "R":
//        return <T>(arr: T[]) => arr.slice(from(slice), to(slice));
//      default:
//        return <T>(arr: T[]) => arr;
//    }
//  }
//}

// vim: set ts=2 sw=2 sts=2:
