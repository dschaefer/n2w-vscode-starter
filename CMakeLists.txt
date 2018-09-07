cmake_minimum_required(VERSION 3.5)

project(n2w-starter)

set(ELECTRON_VERSION 2.0.5)

if(CMAKE_HOST_SYSTEM_NAME STREQUAL "Windows")
    set(NODE_MODULE_BIN ${CMAKE_SOURCE_DIR}/out/win32)
elseif(CMAKE_HOST_SYSTEM_NAME STREQUAL "Linux")
    set(NODE_MODULE_BIN ${CMAKE_SOURCE_DIR}/out/linux)
elseif(CMAKE_HOST_SYSTEM_NAME STREQUAL "Darwin")
    set(NODE_MODULE_BIN ${CMAKE_SOURCE_DIR}/out/darwin)
else()
    message(FATAL_ERROR "Unknown host ${CMAKE_HOST_SYSTEM_NAME}")
endif()

set(CMAKE_MODULE_PATH ${CMAKE_SOURCE_DIR}/cmake/Modules)

add_subdirectory(src/native)
