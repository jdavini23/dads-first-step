"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("app/signup/page",{

/***/ "(app-pages-browser)/./src/lib/auth.ts":
/*!*************************!*\
  !*** ./src/lib/auth.ts ***!
  \*************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   auth: function() { return /* binding */ auth; },\n/* harmony export */   signIn: function() { return /* binding */ signIn; },\n/* harmony export */   signOut: function() { return /* binding */ signOut; },\n/* harmony export */   signUp: function() { return /* binding */ signUp; }\n/* harmony export */ });\n/* harmony import */ var _swc_helpers_async_to_generator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @swc/helpers/_/_async_to_generator */ \"(app-pages-browser)/./node_modules/@swc/helpers/esm/_async_to_generator.js\");\n/* harmony import */ var _swc_helpers_class_call_check__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @swc/helpers/_/_class_call_check */ \"(app-pages-browser)/./node_modules/@swc/helpers/esm/_class_call_check.js\");\n/* harmony import */ var _swc_helpers_ts_generator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @swc/helpers/_/_ts_generator */ \"(app-pages-browser)/./node_modules/tslib/tslib.es6.mjs\");\n\n\n\nvar Auth = /*#__PURE__*/ function() {\n    \"use strict\";\n    function Auth() {\n        (0,_swc_helpers_class_call_check__WEBPACK_IMPORTED_MODULE_0__._)(this, Auth);\n        this.listeners = [];\n    }\n    var _proto = Auth.prototype;\n    _proto.signInWithEmailAndPassword = function signInWithEmailAndPassword(email, password) {\n        var _this = this;\n        return (0,_swc_helpers_async_to_generator__WEBPACK_IMPORTED_MODULE_1__._)(function() {\n            var apiUrl, response, errorData, user, error;\n            return (0,_swc_helpers_ts_generator__WEBPACK_IMPORTED_MODULE_2__.__generator)(this, function(_state) {\n                switch(_state.label){\n                    case 0:\n                        _state.trys.push([\n                            0,\n                            5,\n                            ,\n                            6\n                        ]);\n                        apiUrl =  true ? \"\".concat(window.location.origin, \"/api/auth\") : 0;\n                        return [\n                            4,\n                            fetch(apiUrl, {\n                                method: \"POST\",\n                                headers: {\n                                    \"Content-Type\": \"application/json\"\n                                },\n                                body: JSON.stringify({\n                                    action: \"signin\",\n                                    email: email,\n                                    password: password\n                                })\n                            })\n                        ];\n                    case 1:\n                        response = _state.sent();\n                        if (!!response.ok) return [\n                            3,\n                            3\n                        ];\n                        return [\n                            4,\n                            response.json()[\"catch\"](function() {\n                                return {};\n                            })\n                        ];\n                    case 2:\n                        errorData = _state.sent();\n                        throw new Error(errorData.message || \"Invalid email or password\");\n                    case 3:\n                        return [\n                            4,\n                            response.json()\n                        ];\n                    case 4:\n                        user = _state.sent();\n                        _this.notifyListeners(user);\n                        return [\n                            2,\n                            user\n                        ];\n                    case 5:\n                        error = _state.sent();\n                        console.error(\"SignIn error:\", error);\n                        throw new Error(error instanceof Error ? error.message : \"Authentication failed. Please try again.\");\n                    case 6:\n                        return [\n                            2\n                        ];\n                }\n            });\n        })();\n    };\n    _proto.signOut = function signOut() {\n        var _this = this;\n        return (0,_swc_helpers_async_to_generator__WEBPACK_IMPORTED_MODULE_1__._)(function() {\n            return (0,_swc_helpers_ts_generator__WEBPACK_IMPORTED_MODULE_2__.__generator)(this, function(_state) {\n                if (true) {\n                    localStorage.removeItem(\"auth-storage\");\n                }\n                _this.notifyListeners(null);\n                return [\n                    2\n                ];\n            });\n        })();\n    };\n    _proto.onAuthStateChanged = function onAuthStateChanged(callback) {\n        var _this = this;\n        this.listeners.push(callback);\n        if (true) {\n            var stored = localStorage.getItem(\"auth-storage\");\n            if (stored) {\n                try {\n                    var state = JSON.parse(stored).state;\n                    callback(state.user);\n                } catch (e) {\n                    callback(null);\n                }\n            }\n        }\n        return function() {\n            _this.listeners = _this.listeners.filter(function(listener) {\n                return listener !== callback;\n            });\n        };\n    };\n    _proto.signUp = function signUp(email, password, name) {\n        var _this = this;\n        return (0,_swc_helpers_async_to_generator__WEBPACK_IMPORTED_MODULE_1__._)(function() {\n            var apiUrl, response, errorData, userData, user, error;\n            return (0,_swc_helpers_ts_generator__WEBPACK_IMPORTED_MODULE_2__.__generator)(this, function(_state) {\n                switch(_state.label){\n                    case 0:\n                        _state.trys.push([\n                            0,\n                            5,\n                            ,\n                            6\n                        ]);\n                        apiUrl =  true ? \"\".concat(window.location.origin, \"/api/auth\") : 0;\n                        return [\n                            4,\n                            fetch(apiUrl, {\n                                method: \"POST\",\n                                headers: {\n                                    \"Content-Type\": \"application/json\",\n                                    Accept: \"application/json\"\n                                },\n                                body: JSON.stringify({\n                                    action: \"signup\",\n                                    email: email,\n                                    password: password,\n                                    name: name\n                                }),\n                                credentials: \"include\"\n                            })\n                        ];\n                    case 1:\n                        response = _state.sent();\n                        if (!!response.ok) return [\n                            3,\n                            3\n                        ];\n                        return [\n                            4,\n                            response.json()[\"catch\"](function() {\n                                return {\n                                    error: \"Signup failed\"\n                                };\n                            })\n                        ];\n                    case 2:\n                        errorData = _state.sent();\n                        throw new Error(errorData.error || \"Unable to complete signup\");\n                    case 3:\n                        return [\n                            4,\n                            response.json()\n                        ];\n                    case 4:\n                        userData = _state.sent();\n                        user = {\n                            uid: userData.uid,\n                            email: userData.email,\n                            displayName: userData.displayName || name,\n                            photoURL: userData.photoURL || null\n                        };\n                        _this.notifyListeners(user);\n                        return [\n                            2,\n                            user\n                        ];\n                    case 5:\n                        error = _state.sent();\n                        console.error(\"Signup error:\", error);\n                        throw new Error(error instanceof Error ? error.message : \"Signup failed\");\n                    case 6:\n                        return [\n                            2\n                        ];\n                }\n            });\n        })();\n    };\n    _proto.notifyListeners = function notifyListeners(user) {\n        this.listeners.forEach(function(listener) {\n            return listener(user);\n        });\n    };\n    return Auth;\n}();\nvar auth = new Auth();\nvar signIn = auth.signInWithEmailAndPassword.bind(auth);\nvar signOut = auth.signOut.bind(auth);\nvar signUp = auth.signUp.bind(auth);\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O3VDQUFPO29DQUFFYixPQUFPO2dDQUFnQjs7Ozt3QkFGbkNGLFlBQVk7d0JBR2xCLE1BQU0sSUFBSWdCLE1BQU1oQixVQUFVRSxLQUFLLElBQUk7O3dCQUdwQjs7NEJBQU1ILFNBQVNlLElBQUk7Ozt3QkFBOUJvQixXQUFXO3dCQUNYakMsT0FBYTs0QkFDakJvQyxLQUFLSCxTQUFTRyxHQUFHOzRCQUNqQnpDLE9BQU9zQyxTQUFTdEMsS0FBSzs0QkFDckIwQyxhQUFhSixTQUFTSSxXQUFXLElBQUlMOzRCQUNyQ00sVUFBVUwsU0FBU0ssUUFBUSxJQUFJO3dCQUNqQzt3QkFFQSxNQUFLckIsZUFBZSxDQUFDakI7d0JBQ3JCOzs0QkFBT0E7Ozt3QkFDQUM7d0JBQ1BpQixRQUFRakIsS0FBSyxDQUFDLGlCQUFpQkE7d0JBQy9CLE1BQU0sSUFBSWMsTUFBTWQsaUJBQWlCYyxRQUFRZCxNQUFNZSxPQUFPLEdBQUc7Ozs7Ozs7UUFFN0Q7O0lBRUEsT0FBUUMsZUFFUCxHQUZELFNBQVFBLGdCQUFnQmpCLElBQWlCO1FBQ3ZDLElBQUksQ0FBQ1AsU0FBUyxDQUFDOEMsT0FBTyxDQUFDLFNBQUNUO21CQUFhQSxTQUFTOUI7O0lBQ2hEO1dBL0dJUjs7QUFrSEMsSUFBTWdELE9BQU8sSUFBSWhELE9BQU87QUFDeEIsSUFBTWlELFNBQVNELEtBQUs5QywwQkFBMEIsQ0FBQ2dELElBQUksQ0FBQ0YsTUFBTTtBQUMxRCxJQUFNckIsVUFBVXFCLEtBQUtyQixPQUFPLENBQUN1QixJQUFJLENBQUNGLE1BQU07QUFDeEMsSUFBTVQsU0FBU1MsS0FBS1QsTUFBTSxDQUFDVyxJQUFJLENBQUNGLE1BQU0iLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vc3JjL2xpYi9hdXRoLnRzPzY2OTIiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVXNlciB9IGZyb20gXCJAL3R5cGVzL2F1dGhcIjtcclxuXHJcbmNsYXNzIEF1dGgge1xyXG4gIHByaXZhdGUgbGlzdGVuZXJzOiAoKHVzZXI6IFVzZXIgfCBudWxsKSA9PiB2b2lkKVtdID0gW107XHJcblxyXG4gIGFzeW5jIHNpZ25JbldpdGhFbWFpbEFuZFBhc3N3b3JkKFxyXG4gICAgZW1haWw6IHN0cmluZyxcclxuICAgIHBhc3N3b3JkOiBzdHJpbmcsXHJcbiAgKTogUHJvbWlzZTxVc2VyPiB7XHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zdCBhcGlVcmwgPVxyXG4gICAgICAgIHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCJcclxuICAgICAgICAgID8gYCR7d2luZG93LmxvY2F0aW9uLm9yaWdpbn0vYXBpL2F1dGhgXHJcbiAgICAgICAgICA6IFwiL2FwaS9hdXRoXCI7XHJcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goYXBpVXJsLCB7XHJcbiAgICAgICAgbWV0aG9kOiBcIlBPU1RcIixcclxuICAgICAgICBoZWFkZXJzOiB7IFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiIH0sXHJcbiAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoeyBhY3Rpb246IFwic2lnbmluXCIsIGVtYWlsLCBwYXNzd29yZCB9KSxcclxuICAgICAgfSk7XHJcblxyXG4gICAgICBpZiAoIXJlc3BvbnNlLm9rKSB7XHJcbiAgICAgICAgY29uc3QgZXJyb3JEYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpLmNhdGNoKCgpID0+ICh7fSkpO1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihlcnJvckRhdGEubWVzc2FnZSB8fCBcIkludmFsaWQgZW1haWwgb3IgcGFzc3dvcmRcIik7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGNvbnN0IHVzZXIgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XHJcbiAgICAgIHRoaXMubm90aWZ5TGlzdGVuZXJzKHVzZXIpO1xyXG4gICAgICByZXR1cm4gdXNlcjtcclxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgIGNvbnNvbGUuZXJyb3IoXCJTaWduSW4gZXJyb3I6XCIsIGVycm9yKTtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKFxyXG4gICAgICAgIGVycm9yIGluc3RhbmNlb2YgRXJyb3JcclxuICAgICAgICAgID8gZXJyb3IubWVzc2FnZVxyXG4gICAgICAgICAgOiBcIkF1dGhlbnRpY2F0aW9uIGZhaWxlZC4gUGxlYXNlIHRyeSBhZ2Fpbi5cIixcclxuICAgICAgKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGFzeW5jIHNpZ25PdXQoKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIikge1xyXG4gICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShcImF1dGgtc3RvcmFnZVwiKTtcclxuICAgIH1cclxuICAgIHRoaXMubm90aWZ5TGlzdGVuZXJzKG51bGwpO1xyXG4gIH1cclxuXHJcbiAgb25BdXRoU3RhdGVDaGFuZ2VkKGNhbGxiYWNrOiAodXNlcjogVXNlciB8IG51bGwpID0+IHZvaWQpOiAoKSA9PiB2b2lkIHtcclxuICAgIHRoaXMubGlzdGVuZXJzLnB1c2goY2FsbGJhY2spO1xyXG5cclxuICAgIGlmICh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgICAgIGNvbnN0IHN0b3JlZCA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwiYXV0aC1zdG9yYWdlXCIpO1xyXG4gICAgICBpZiAoc3RvcmVkKSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgIGNvbnN0IHsgc3RhdGUgfSA9IEpTT04ucGFyc2Uoc3RvcmVkKTtcclxuICAgICAgICAgIGNhbGxiYWNrKHN0YXRlLnVzZXIpO1xyXG4gICAgICAgIH0gY2F0Y2gge1xyXG4gICAgICAgICAgY2FsbGJhY2sobnVsbCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuICgpID0+IHtcclxuICAgICAgdGhpcy5saXN0ZW5lcnMgPSB0aGlzLmxpc3RlbmVycy5maWx0ZXIoXHJcbiAgICAgICAgKGxpc3RlbmVyKSA9PiBsaXN0ZW5lciAhPT0gY2FsbGJhY2ssXHJcbiAgICAgICk7XHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgYXN5bmMgc2lnblVwKGVtYWlsOiBzdHJpbmcsIHBhc3N3b3JkOiBzdHJpbmcsIG5hbWU6IHN0cmluZyk6IFByb21pc2U8VXNlcj4ge1xyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3QgYXBpVXJsID1cclxuICAgICAgICB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiXHJcbiAgICAgICAgICA/IGAke3dpbmRvdy5sb2NhdGlvbi5vcmlnaW59L2FwaS9hdXRoYFxyXG4gICAgICAgICAgOiBcIi9hcGkvYXV0aFwiO1xyXG4gICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKGFwaVVybCwge1xyXG4gICAgICAgIG1ldGhvZDogXCJQT1NUXCIsXHJcbiAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIsXHJcbiAgICAgICAgICBBY2NlcHQ6IFwiYXBwbGljYXRpb24vanNvblwiLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe1xyXG4gICAgICAgICAgYWN0aW9uOiBcInNpZ251cFwiLFxyXG4gICAgICAgICAgZW1haWwsXHJcbiAgICAgICAgICBwYXNzd29yZCxcclxuICAgICAgICAgIG5hbWUsXHJcbiAgICAgICAgfSksXHJcbiAgICAgICAgY3JlZGVudGlhbHM6IFwiaW5jbHVkZVwiLFxyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIGlmICghcmVzcG9uc2Uub2spIHtcclxuICAgICAgICBjb25zdCBlcnJvckRhdGEgPSBhd2FpdCByZXNwb25zZVxyXG4gICAgICAgICAgLmpzb24oKVxyXG4gICAgICAgICAgLmNhdGNoKCgpID0+ICh7IGVycm9yOiBcIlNpZ251cCBmYWlsZWRcIiB9KSk7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGVycm9yRGF0YS5lcnJvciB8fCBcIlVuYWJsZSB0byBjb21wbGV0ZSBzaWdudXBcIik7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGNvbnN0IHVzZXJEYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xyXG4gICAgICBjb25zdCB1c2VyOiBVc2VyID0ge1xyXG4gICAgICAgIHVpZDogdXNlckRhdGEudWlkLFxyXG4gICAgICAgIGVtYWlsOiB1c2VyRGF0YS5lbWFpbCxcclxuICAgICAgICBkaXNwbGF5TmFtZTogdXNlckRhdGEuZGlzcGxheU5hbWUgfHwgbmFtZSxcclxuICAgICAgICBwaG90b1VSTDogdXNlckRhdGEucGhvdG9VUkwgfHwgbnVsbCxcclxuICAgICAgfTtcclxuXHJcbiAgICAgIHRoaXMubm90aWZ5TGlzdGVuZXJzKHVzZXIpO1xyXG4gICAgICByZXR1cm4gdXNlcjtcclxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgIGNvbnNvbGUuZXJyb3IoXCJTaWdudXAgZXJyb3I6XCIsIGVycm9yKTtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKGVycm9yIGluc3RhbmNlb2YgRXJyb3IgPyBlcnJvci5tZXNzYWdlIDogXCJTaWdudXAgZmFpbGVkXCIpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBub3RpZnlMaXN0ZW5lcnModXNlcjogVXNlciB8IG51bGwpIHtcclxuICAgIHRoaXMubGlzdGVuZXJzLmZvckVhY2goKGxpc3RlbmVyKSA9PiBsaXN0ZW5lcih1c2VyKSk7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgYXV0aCA9IG5ldyBBdXRoKCk7XHJcbmV4cG9ydCBjb25zdCBzaWduSW4gPSBhdXRoLnNpZ25JbldpdGhFbWFpbEFuZFBhc3N3b3JkLmJpbmQoYXV0aCk7XHJcbmV4cG9ydCBjb25zdCBzaWduT3V0ID0gYXV0aC5zaWduT3V0LmJpbmQoYXV0aCk7XHJcbmV4cG9ydCBjb25zdCBzaWduVXAgPSBhdXRoLnNpZ25VcC5iaW5kKGF1dGgpO1xyXG4iXSwibmFtZXMiOlsiQXV0aCIsImxpc3RlbmVycyIsInNpZ25JbldpdGhFbWFpbEFuZFBhc3N3b3JkIiwiZW1haWwiLCJwYXNzd29yZCIsImFwaVVybCIsInJlc3BvbnNlIiwiZXJyb3JEYXRhIiwidXNlciIsImVycm9yIiwid2luZG93IiwibG9jYXRpb24iLCJvcmlnaW4iLCJmZXRjaCIsIm1ldGhvZCIsImhlYWRlcnMiLCJib2R5IiwiSlNPTiIsInN0cmluZ2lmeSIsImFjdGlvbiIsIm9rIiwianNvbiIsImNhdGNoIiwiRXJyb3IiLCJtZXNzYWdlIiwibm90aWZ5TGlzdGVuZXJzIiwiY29uc29sZSIsInNpZ25PdXQiLCJsb2NhbFN0b3JhZ2UiLCJyZW1vdmVJdGVtIiwib25BdXRoU3RhdGVDaGFuZ2VkIiwiY2FsbGJhY2siLCJwdXNoIiwic3RvcmVkIiwiZ2V0SXRlbSIsInN0YXRlIiwicGFyc2UiLCJmaWx0ZXIiLCJsaXN0ZW5lciIsInNpZ25VcCIsIm5hbWUiLCJ1c2VyRGF0YSIsIkFjY2VwdCIsImNyZWRlbnRpYWxzIiwidWlkIiwiZGlzcGxheU5hbWUiLCJwaG90b1VSTCIsImZvckVhY2giLCJhdXRoIiwic2lnbkluIiwiYmluZCJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(app-pages-browser)/./src/lib/auth.ts\n"));

/***/ })

});