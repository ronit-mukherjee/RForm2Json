((env, doc) => {
  const _selectorsArr = [];
  const _selectedElementsRefArr = [];

  function RForm2Json(selector = null) {
    if (selector != null) {
      this.selector = selector;
      const rftj = this;

      const _options = {
        "keySelectorType": "attribute",
        "keySelector": "name",
        "valueSelectorType": "value",
        "valueSelector": "value",
        "keys": [],
        "exclude": []
      };

      const _addNewSelector = () => {
        try {
          const selectedElemRef = doc.querySelector(selector);

          if (selectedElemRef) {
            _selectorsArr.push(selector);
            _selectedElementsRefArr.push(selectedElemRef);

            return _selectedElementsRefArr[_selectedElementsRefArr.length - 1];
          }

          return false;
        } catch (e) {
          console.error(e);
        }
      }

      const _getSelectedElementRef = (selector = "") => {
        try {
          //First search for same select element
          if (selector != null) {
            if (_selectorsArr.length > 0) {
              let i = _selectorsArr.indexOf(selector);

              if (i >= 0) {
                //Same selector found
                return _selectedElementsRefArr[i];
              } else {
                //Look for selected element ref but with different selector
                const selectedElemRef = doc.querySelector(selector);

                function _matchDom(ref) {
                  if (ref === selectedElemRef) {
                    return true;
                  }

                  return false;
                }

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
      }

      const _getInputElements = (sf = null) => {
        try {
          let elems = [];

          if (sf !== null && sf instanceof HTMLElement) {
            elems = sf.querySelectorAll("input,select,textarea");
          }

          return elems;
        } catch (e) {
          console.error(e);
        }
      }

      const _getKeyForJson = (field = null, options = {}) => {
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
      }

      const _getMultiSelectValues = select => {
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
      }

      const _getValueForJson = (field = null, options = {}) => {
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
      }

      const _selectedElementRef = rftj.selectedElemRef = _getSelectedElementRef(selector);

      this.getJSON = (options = {}) => {
        try {
          options = {
            ..._options,
            ...options
          }

          const json = {};

          function _setProperty(key, value) {
            if (value || value == "") {
              if ((!json.hasOwnProperty(key)) || (json.hasOwnProperty(key) && json[key] === "" && value !== "")) {
                json[key] = value;
              }
            }
          }

          if (_selectedElementRef) {
            const fields = _getInputElements(_selectedElementRef);

            for (let j = 0; j < fields.length; j++) {
              const field = fields[j];

              const key = _getKeyForJson(field, options);

              if (key) {
                const value = _getValueForJson(field, options);

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

  const init = selector => {
    try {
      return new RForm2Json(selector);
    } catch (e) {
      console.error(e);
    }
  }

  //Make it available globally
  window.RForm2Json = window.F2J = init;
})(window, document);
