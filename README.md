# RForm2Json
A javascript library to convert any input fields to JSON.

## Usage
	<script type="text/javascript" src="path_to_file/RForm2Json.min.js"></script>
	<script type="text/javascript>
		const jsonData = F2J(selector).getJSON(options);
	</script>

## Example
	<div id="foo">
		<input type="text" name="key1" value="value1" />
		<input type="text" name="key2" value="value2" />
		
		<select name="key3">
			<option value="option1">Option 1</option>
			<option value="option2" selected>Option 2</option>
		</select>
		
		<input type="radio" name="key4" value="on" />
		<input type="radio" name="key4" value="off" checked />

		<input type="checkbox" name="key5" value="on" checked />
		<input type="checkbox" name="key5" value="off" />
	</div>
	
	<script type="text/javascript">
		const jsonData = F2J("#foo").getJSON();
		
		//Output:
		{
			"key1":"value1",
			"key2":"value2",
			"key3": "option2",
			"key4": "off",
			"key5": "on"
		}
	</script>

## Selector
Selector is any jQuery/CSS style selector which can be passed to select the element for whose inputs/fields need to be converted to JSON.

## Options

 - **keySelectorType**(Default: "name")
	 This option can be used to set what to type of thing to use for key's name selector. By default *name* attribute of the field is used.
		 
	**Possible Values - name, attribute** 
 
- **keySelector**(Default:"")
	 If keySelectorType=attribute , then this option is used to pass the name of the attribute to pick the name of the key for json.
 
 - **valueSelectorType**(Default: "value")
	 This option can be used to set what to type of thing to use for value By default *value* of the field is used.
	 
	**Possible Values - value, attribute** 
 
 - **valueSelector**(Default: "")
	  If valueSelectorType=attribute , then this option is used to pass the name of the attribute to pick the value for json.
 - **keys**(Default: [])
	 This option is used to pass the name of the keys to be only included in the json. If suppose there are total 10 fileds in selected element, but if pass only 5 names of the keys in this option then only those *key:value* will be available in the final json.
 - **exclude**(Default: [])
	 This option is used to pass the name of the keys to be excluded in the json. If suppose there are total 10 fileds in selected element, but if pass 2 names of the keys in this option then the passed keys will not be available in the final json.
