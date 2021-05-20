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
//type Comparable = "name" | "tag_name" | "draft" | "prerelease";
//const comparable: Comparable[] = ["name", "tag_name", "draft", "prerelease"];
//interface FilterTest {
//  (entry: Release): boolean;
//}
//
export class Filter {
  static compare(value: string, expect: RegExp | string): boolean;
  static compare(value: unknown, expect: unknown): boolean;
  static compare(value: unknown, expect: unknown): boolean {
    if (
      typeof value === "string" &&
      (typeof expect === "string" ||
        (typeof expect === "object" && expect instanceof RegExp))
    ) {
      return Filter.match(value, expect);
    } else {
      return Filter.same(value, expect);
    }
  }

  tests: FilterTest[];

  static match(value: string, expect: RegExp | string): boolean {
    return expect instanceof RegExp ? expect.test(value) : value === expect;
  }

  static same(value: unknown, expect: unknown): boolean {
    return value === expect;
  }

  static makeTests(inputs: SafeInputs): FilterTest[] {
    return comparable
      .filter((key) => inputs[key] != null)
      .map(
        (key) => (entry: Release) => Filter.compare(entry[key], inputs[key])
      );
  }

  constructor(inputs: SafeInputs) {
    this.tests = Filter.makeTests(inputs);
  }

  get callback() {
    return (entry: Release): boolean => {
      return this.tests.reduce(
        (acc: boolean, test: FilterTest) => acc && test(entry),
        true
      );
    };
  }

  filter(entries: Release[]): Release[] {
    return entries.filter(this.callback);
  }
}

// vim: set ts=2 sw=2 sts=2:
