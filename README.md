# Native to Webview VS Code Starter Extension

This project is a starter project and a small example of a Visual Studio Code extension that incorporates a native C++ node addon that implements an asynchronous add function and a webview that shows the results.

## Dependencies

Beyond a node.js and yarn environment that you normally use for VS Code extensions, you also need a native toolchain that contains the following tools:

- CMake
- Ninja
- Compiler (GCC on Linux and Windows, and XCode command line tools on Mac)

These are available on Linux in all distributions. CMake and ninja can be installed on Mac using Homebrew. On Windows, [Scoop](https://scoop.sh) provides these tools in a regular native build environment.

## Build

First, install the dependencies from npm then run the compile command.

<pre>
    yarn
    yarn compile
</pre>

The compile has two parts that can be invoked separately
- 'yarn compile:native' to build the native C++ addon using CMake and ninja
- 'yarn compile:webpack' to build the view and the extension using webpack

When working on the project, 'yarn watch' will start up webpack in watch mode. A VS Code task is provided for that as well. 'yarn compile:native' is also provided as the default build task. which can be invoked by the Ctrl+Shift+B keyboard shortcut.

## Launch

A standard VS Code extension launch is provided that can be run using the F5 keyboard shortcut.