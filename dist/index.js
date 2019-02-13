"use strict";

var _app = _interopRequireDefault(require("./config/app"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_app.default.listen(4000, '0.0.0.0', function () {
  console.log("Server live at localhost:4000");
});