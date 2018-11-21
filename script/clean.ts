import fs from "fs";
import glob from "glob";

const ext = "{js,d.ts}";

glob.sync(`{lib,parsers,script}/**/*.${ext}`)
  .concat(glob.sync(`test{*,/!(data)/**}/*.${ext}`))
  .concat(glob.sync(`main.${ext}`))
  .forEach(filename => {
    if (fs.existsSync(filename)) {
      fs.unlinkSync(filename);
    }
  });
