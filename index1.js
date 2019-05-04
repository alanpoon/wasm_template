import Module from "./dist/polyfill.js";
const ws = require("ws");

const env = {
  rust_wasm_syscall: (index, data) => {
    console.log("rust_wasm_syscall", index, data);
    // See https://github.com/rust-lang/rust/blob/master/src/libstd/sys/wasm/mod.rs
    switch (index) {
      case 6:
        return 1;
      default:
        return 0;
    }
  }
};

const instantiateStreaming = WebAssembly.instantiateStreaming;
WebAssembly.instantiateStreaming = (source, importObject) =>
  instantiateStreaming(source, {
    ...importObject,
    env,ws,...Module
  });
const instantiate = WebAssembly.instantiate;
WebAssembly.instantiate = (bufferSource, importObject) =>
  instantiate(bufferSource, {
    ...importObject,
    env,ws,...Module
  });
 // init("./dist/native_bg.wasm")
