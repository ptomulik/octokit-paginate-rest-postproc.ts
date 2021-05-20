//import {
//  Release,
//  SafeInputs,
//  SortSpecs,
//  SortSpec,
//  SelectSpecs,
//  SliceSpec,
//} from "./types";
//
//export class Selector {
//  select: (entries: Release[]) => Partial<Release>[];
//  constructor(keys: SelectSpecs) {
//    if (keys == null) {
//      this.select = (entries) => entries;
//    } else {
//      this.select = (entries) => entries.map(Selector.callback(keys));
//    }
//  }
//
//  static callback(keys: SelectSpecs): (entry: Release) => Partial<Release> {
//    if (keys == null) {
//      return (entry: Release) => entry;
//    } else {
//      return (entry: Release) => pick(entry, keys);
//    }
//  }
//}
//

// vim: set ts=2 sw=2 sts=2:
