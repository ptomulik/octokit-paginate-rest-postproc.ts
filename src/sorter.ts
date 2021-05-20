//import {
//  Release,
//  SafeInputs,
//  SortSpecs,
//  SortSpec,
//  SelectSpecs,
//  SliceSpec,
//} from "./types";
//
//export class Sorter {
//  sort: (entries: Release[]) => Release[];
//
//  constructor(sort?: SortSpecs) {
//    if (sort == null) {
//      this.sort = (entries) => entries;
//    } else {
//      this.sort = (entries) => entries.sort(Sorter.callback(sort));
//    }
//  }
//
//  static cmp(left: unknown, right: unknown): number {
//    function isNumeric(arg: unknown): arg is boolean | number {
//      return ["boolean", "number"].includes(typeof arg);
//    }
//
//    // nulls and undefined values shall be moved to the end
//    for (const special of [undefined, null]) {
//      if (left === special && right === special) {
//        return 0;
//      } else if (left === special) {
//        return 1;
//      } else if (right === special) {
//        return -1;
//      }
//    }
//
//    if (isNumeric(left) && isNumeric(right)) {
//      return Math.sign((left as number) - (right as number));
//    }
//
//    return Object(left).toString().localeCompare(Object(right).toString());
//  }
//
//  static callback(
//    sort: SortSpecs
//  ): ((le: Release, re: Release) => number) | undefined {
//    if (sort == null) {
//      return undefined;
//    } else {
//      return (le: Release, re: Release) =>
//        sort
//          .map(([key, ord]: SortSpec) =>
//            ord === "D" ? [re[key], le[key]] : [le[key], re[key]]
//          )
//          .reduce(
//            (result, [left, right]) =>
//              result === 0 ? Sorter.cmp(left, right) : result,
//            0
//          );
//    }
//  }
//}

// vim: set ts=2 sw=2 sts=2:
