# Unchained UI

## Form

[![NPM Version](https://img.shields.io/npm/v/uc-Form.svg?style=flat-square)](https://www.npmjs.com/package/uc-Form)
[![NPM Downloads](https://img.shields.io/npm/dt/uc-Form.svg?style=flat-square)](https://www.npmjs.com/package/uc-Form)

Form mixin for custom forms with tab key navigation support

### Usage

```js
import compose from 'uc-compose'
import form from 'uc-form'

const MyClass = function(el) {
  this.el = el;
  this.addForm();
}
MyClass.prototype = compose(
  form,
  {
    done: function() {
      // clicked on the anchor element with #/done hash
      // or button with done value
      console.log('Done!');
    },

    '13': function() {
      console.log('Enter is pressed');
    },

    remove: function() {
      this.removeForm();
    }
  }
)
```

### Methods

#### addForm()

Adds all the events listeners:

* Prevents default behavior for all the links with hash.
* Executes method with the name as:
  - `#/name` for links
  - `value="name"` for buttons
* Document `keydown`:
  - If the class has the method with keyCode as its name, it will be executed
  - If `enter` or `space` is pressed and the active element is an anchor or button it the `click` will be executed.
  - When `tab` is pressed, the focus follows `[tabindex]`. Works for custom UI elements as well.

#### removeForm()

Removes all the events listeners.

License MIT

© velocityzen

