//import {
//  Release,
//  SafeInputs,
//  SortSpecs,
//  SortSpec,
//  SelectSpecs,
//  SliceSpec,
//} from "./types";
//
//import { pick } from "./pick";
//
//export class Processor {
//  filter: Filter;
//  sorter: Sorter;
//  selector: Selector;
//  slicer: Slicer;
//
//  constructor(inputs: SafeInputs) {
//    this.filter = new Filter(inputs);
//    this.sorter = new Sorter(inputs.sort);
//    this.selector = new Selector(inputs.select);
//    this.slicer = new Slicer(inputs.slice);
//  }
//
//  process(entries: Release[]): Partial<Release>[] {
//    return this.slicer.slice(
//      this.selector.select(this.sorter.sort(this.filter.filter(entries)))
//    );
//  }
//}

// vim: set ts=2 sw=2 sts=2:
