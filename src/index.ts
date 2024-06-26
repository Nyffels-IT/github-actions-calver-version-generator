import * as core from "@actions/core";
import * as github from "@actions/github";
import dayjs from "dayjs";

async function run() {
  try {
    const prefix = core.getInput("prefix") ?? "";
    const suffix = core.getInput("suffix") ?? "";
    const format = core.getInput("format") ?? "YYYYMMDD";
    const subversion = core.getInput("build") ?? "build";
    const buildNumber = github.context.runNumber;

    const currentDate = new Date().toUTCString();
    let versionStr = dayjs(currentDate).format(format);
    if (prefix.length > 0) {
      versionStr = prefix + versionStr;
    }
    if (suffix.length > 0) {
      versionStr += suffix;
    }

    switch (subversion) {
      default: {
        versionStr += `.${buildNumber}`;
      }
    }

    core.exportVariable("VERSION", versionStr);
    core.setOutput("version", versionStr);
  } catch (err) {
    core.setFailed(err.message);
  }
}

run();
