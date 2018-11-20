import assert from "assert";
import fs from "fs";
import path from "path";
import types from "../lib/types";
import main from "../main";

function testFile(path: string) {
    fs.readFile(path, "utf-8", function(err, source) {
        assert.equal(err, null);
        assert.strictEqual(typeof source, "string");

        var ast = main.parse(source);
        types.astNodesAreEquivalent.assert(ast.original, ast);
        var code = main.print(ast).code;
        assert.strictEqual(source, code);
    });
}

function addTest(name: string) {
    it(name, function() {
        testFile(path.join(__dirname, "..", name + ".js"));
    });
}

describe("identity", function() {
    // Add more tests here as need be.
    addTest("test/data/regexp-props");
    addTest("test/data/empty");
    addTest("test/data/backbone");
    addTest("test/lines");
    addTest("lib/lines");
    addTest("lib/printer");
});
