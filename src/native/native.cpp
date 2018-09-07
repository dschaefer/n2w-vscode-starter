#include <node_api.h>
#include <stdio.h>

bool failed(napi_env env, napi_status status, const char *file, int line, const char *func) {
    if (status != napi_ok) {
        char buff[1024];
        sprintf(buff, "%s:%d (%s) napi_status %d", file, line, func, status);
        napi_throw_error(env, nullptr, buff);
        return true;
    } else {
        return false;
    }
}

#define NAPI_CHECK(status, ...) if (failed(env, status, __FILE__, __LINE__, __func__)) return __VA_ARGS__;

struct WorkData {
    napi_async_work work;
    napi_deferred deffered;
    double x, y, result;
};

static void addWork(napi_env env, void *data) {
    WorkData *workData = static_cast<WorkData *>(data);

    workData->result = workData->x + workData->y;
}

static void addCompleted(napi_env env, napi_status workStatus, void *data) {
    napi_status status;
    WorkData *workData = static_cast<WorkData *>(data);

    napi_value resultValue;
    status = napi_create_double(env, workData->result, &resultValue);
    NAPI_CHECK(status);

    status = napi_resolve_deferred(env, workData->deffered, resultValue);
    NAPI_CHECK(status);

    status = napi_delete_async_work(env, workData->work);
    delete workData;
}

static napi_value add(napi_env env, napi_callback_info info) {
    napi_status status;

    size_t argc = 2;
    napi_value argv[2];
    status = napi_get_cb_info(env, info, &argc, argv, nullptr, nullptr);
    NAPI_CHECK(status, nullptr);

    if (argc < 2) {
        napi_throw_type_error(env, nullptr, "add(x, y) missing parameters");
        return nullptr;
    }

    WorkData *workData = new WorkData();

    status = napi_get_value_double(env, argv[0], &workData->x);
    NAPI_CHECK(status, nullptr);

    status = napi_get_value_double(env, argv[1], &workData->y);
    NAPI_CHECK(status, nullptr);

    napi_value promise;
    status = napi_create_promise(env, &workData->deffered, &promise);
    NAPI_CHECK(status, nullptr);

    napi_value workName;
    status = napi_create_string_utf8(env, "n2wNative::add", NAPI_AUTO_LENGTH, &workName);
    NAPI_CHECK(status, nullptr);

    status = napi_create_async_work(env, nullptr, workName, addWork, addCompleted, workData, &workData->work);
    NAPI_CHECK(status, nullptr);

    status = napi_queue_async_work(env, workData->work);
    NAPI_CHECK(status, nullptr);

    return promise;
}

static napi_value init(napi_env env, napi_value exports) {
    napi_status status;

    napi_value addFunc;
    status = napi_create_function(env, "add", NAPI_AUTO_LENGTH, add, nullptr, &addFunc);
    NAPI_CHECK(status, exports);

    status = napi_set_named_property(env, exports, "add", addFunc);
    NAPI_CHECK(status, exports);

    return exports;
}

NAPI_MODULE(n2wNative, init);
