include(ExternalProject)

set(iojsUrl "https://atom.io/download/electron/v${ELECTRON_VERSION}")

ExternalProject_Add(iojs
    PREFIX ${CMAKE_BINARY_DIR}/iojs
    URL ${iojsUrl}/iojs-v${ELECTRON_VERSION}.tar.gz
    CONFIGURE_COMMAND ""
    BUILD_COMMAND ""
    INSTALL_COMMAND ""
)
ExternalProject_Get_Property(iojs source_dir)
set(iojsIncludeDir ${source_dir})
set(iojsIncludes ${iojsIncludeDir}/src ${iojsIncludeDir}/deps/v8/include ${iojsIncludeDir}/deps/uv/include)

if(CMAKE_HOST_SYSTEM_NAME STREQUAL "Windows")
    set(NODE_MODULE_BIN ${NODE_MODULE_OUTPUT_DIR}/win32)
elseif(CMAKE_HOST_SYSTEM_NAME STREQUAL "Linux")
    set(NODE_MODULE_BIN ${NODE_MODULE_OUTPUT_DIR}/linux)
elseif(CMAKE_HOST_SYSTEM_NAME STREQUAL "Darwin")
    set(NODE_MODULE_BIN ${NODE_MODULE_OUTPUT_DIR}/darwin)
else()
    message(FATAL_ERROR "Unknown host ${CMAKE_HOST_SYSTEM_NAME}")
endif()

macro(add_node_module target)
	if(NOT EXISTS "${CMAKE_BINARY_DIR}/iojs/iojs.lib")
		file(DOWNLOAD "${iojsUrl}/win-x64/iojs.lib" "${CMAKE_BINARY_DIR}/iojs/iojs.lib")
	endif()

    add_library(${target} SHARED ${ARGN})
    set_target_properties(${target} PROPERTIES PREFIX "" SUFFIX ".node")
    target_include_directories(${target} PRIVATE ${iojsIncludes})
    if(APPLE)
        target_link_libraries(${target} "-undefined dynamic_lookup")
    elseif(WIN32)
    	target_link_libraries(${target} "${CMAKE_BINARY_DIR}/iojs/iojs.lib")
    endif()
    add_dependencies(${target} iojs)
    install(TARGETS ${target} DESTINATION ${NODE_MODULE_BIN})
endmacro(add_node_module)