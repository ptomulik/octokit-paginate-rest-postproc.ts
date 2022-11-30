#!/usr/bin/env node

const path = require("path");
const https = require("https");
const fs = require("fs");


function usage() {
  const me = path.basename(process.argv[1]);
  return `
NAME

    ${me} - fetch GitHub REST API schema from its repository.

SYNOPSIS:

    ${me} <version>|--help

DESCRIPTION

    The file is fetched from https://github.com/github/rest-api-description.
    The file is saved as generated/descriptions.json.

ARGUMENTS

    version: shall refer to a version (tag or branch) in the source repository.
`
}

function fail(message, printUsage = true) {
  console.error(message);
  if (printUsage) {
    console.error(usage());
  }
  process.exit(1);
}

function help() {
  console.log(usage());
  process.exit(0);
}

function main() {
  if (process.argv.length < 3) {
    fail("error: missing argument");
  }

  if (process.argv.length > 3) {
    fail("error: too many argument");
  }

  if (process.argv[2] === "--help") {
    help();
  }

  const tag = process.argv[2];
  const host = "raw.githubusercontent.com";
  const owner = "github";
  const repo = "rest-api-description";
  const spath = "descriptions/api.github.com/api.github.com.json";
  const url = `https://${host}/${owner}/${repo}/${tag}/${spath}`;
  const dpath = path.resolve(__dirname, "generated", "descriptions.json");
  const file = fs.createWriteStream(dpath);
  const request = https.get(url, (response) => {
    response.pipe(file);
  });

}

main();

// vim: set ts=2 sw=2 sts=2:
