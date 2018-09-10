cmake_minimum_required(VERSION 3.5)

project(n2w-starter)

set(CMAKE_MODULE_PATH ${CMAKE_SOURCE_DIR}/cmake/Modules)

set(ELECTRON_VERSION 2.0.5)

set(NODE_MODULE_OUTPUT_DIR ${CMAKE_SOURCE_DIR}/out)

add_subdirectory(src/native)
