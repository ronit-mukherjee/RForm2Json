
"use strict";

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return right[Symbol.hasInstance](left); } else { return left instanceof right; } }

(function (env, doc) {
  var _selectorsArr = [];
  var _selectedElementsRefArr = [];

  function RForm2Json() {
    var selector = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

    if (selector != null) {
      this.selector = selector;
      var rftj = this;
      var _options = {
        keySelectorType: "attribute",
        keySelector: "name",
        valueSelectorType: "value",
        valueSelector: "value",
        keys: [],
        exclude: []
      };

      var _addNewSelector = function _addNewSelector() {
        try {
          var selectedElemRef = doc.querySelector(selector);

          if (selectedElemRef) {
            _selectorsArr.push(selector);

            _selectedElementsRefArr.push(selectedElemRef);

            return _selectedElementsRefArr[_selectedElementsRefArr.length - 1];
          }

          return false;
        } catch (e) {
          console.error(e);
        }
      };

      var _getSelectedElementRef = function _getSelectedElementRef() {
        var selector = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";

        try {
          //First search for same select element
          if (selector != null) {
            if (_selectorsArr.length > 0) {
              var i = _selectorsArr.indexOf(selector);

              if (i >= 0) {
                //Same selector found
                return _selectedElementsRefArr[i];
              } else {
                var _matchDom = function _matchDom(ref) {
                  if (ref === selectedElemRef) {
                    return true;
                  }

                  return false;
                };

                //Look for selected element ref but with different selector
                var selectedElemRef = doc.querySelector(selector);
                i = _selectedElementsRefArr.findIndex(_matchDom);

                if (i >= 0) {
                  return _selectedElementsRefArr[i];
                } else {
                  return _addNewSelector();
                }
              }
            } else {
              return _addNewSelector();
            }
          }

          return false;
        } catch (e) {
          console.error(e);
        }
      };

      var _getInputElements = function _getInputElements() {
        var sf = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

        try {
          var elems = [];

          if (sf !== null && _instanceof(sf, HTMLElement)) {
            elems = sf.querySelectorAll("input,select,textarea");
          }

          return elems;
        } catch (e) {
          console.error(e);
        }
      };

      var _getKeyForJson = function _getKeyForJson() {
        var field = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        if (field != null) {
          switch (options.keySelectorType) {
            case "name":
              return field.getAttribute("name");
              break;

            case "attribute":
              return field.getAttribute(options.keySelector);
              break;

            default:
              return false;
          }
        }
      };

      var _getMultiSelectValues = function _getMultiSelectValues(select) {
        var result = [];
        var options = select && select.options;
        var opt;

        for (var i = 0, iLen = options.length; i < iLen; i++) {
          opt = options[i];

          if (opt.selected) {
            result.push(opt.value || opt.text);
          }
        }

        return result;
      };

      var _getValueForJson = function _getValueForJson() {
        var field = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        if (field != null) {
          switch (options.valueSelectorType) {
            case "value":
              if (field.type == "checkbox" || field.type == "radio") {
                if (field.checked) {
                  return field.value;
                } else {
                  return "";
                }
              } else if (field.type === "select-multiple") {
                return _getMultiSelectValues(field);
              } else {
                return field.value;
              }

              break;

            case "attribute":
              return field.getAttribute(options.valueSelector);
              break;

            default:
              return false;
          }
        }
      };

      var _selectedElementRef = rftj.selectedElemRef = _getSelectedElementRef(selector);

      this.getJSON = function () {
        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        try {
          var _setProperty = function _setProperty(key, value) {
            if (value || value == "") {
              if (!json.hasOwnProperty(key) || json.hasOwnProperty(key) && json[key] === "" && value !== "") {
                json[key] = value;
              }
            }
          };

          options = _objectSpread({}, _options, options);
          var json = {};

          if (_selectedElementRef) {
            var fields = _getInputElements(_selectedElementRef);

            for (var j = 0; j < fields.length; j++) {
              var field = fields[j];

              var key = _getKeyForJson(field, options);

              if (key) {
                var value = _getValueForJson(field, options);

                if (options.keys.length > 0) {
                  if (options.keys.indexOf(key) >= 0) {
                    if (options.exclude.length > 0) {
                      if (options.exclude.indexOf(key) < 0) {
                        _setProperty(key, value);
                      }
                    } else {
                      _setProperty(key, value);
                    }
                  }
                } else {
                  if (options.exclude.length > 0) {
                    if (options.exclude.indexOf(key) < 0) {
                      _setProperty(key, value);
                    }
                  } else {
                    _setProperty(key, value);
                  }
                }
              }
            }

            return json;
          }
        } catch (e) {
          console.error(e);
        }
      };
    }
  }

  var init = function init(selector) {
    try {
      return new RForm2Json(selector);
    } catch (e) {
      console.error(e);
    }
  }; //Make it available globally


  window.RForm2Json = window.F2J = init;
})(window, document);