import { on, off } from 'uc-dom';
import { toCamelCase } from 'uc-strings';
import { debounce } from 'uc-flow';

export function getTabActiveEl(els, isPrev) {
  let index = 0;
  const l = els.length;
  for (; index < l; index++) {
    if (els.item(index) === document.activeElement) {
      break;
    }
  }

  if (index === l) {
    index = 0;
  } else if (isPrev) {
    if (index === 0) {
      index = els.item[els.length - 1];
    } else {
      index--;
    }
  } else if (index === els.length - 1) {
    index = 0;
  } else {
    index++;
  }

  return els.item(index);
}

export default {
  addForm: function() {
    if (!this.on) {
      this.on = {}
    }

    this.on._formClick = on(this.el, 'click', 'a', e => {
      if (this.hash) {
        e.preventDefault();
      }
    });

    const self = this;
    this.on._formAClickDebounced = on(this.el, 'click', 'a', debounce(function() {
      if (this.hash) {
        const cmd = toCamelCase(this.hash.split('/')[1]);
        self[cmd]();
      }
    }, 500, true));

    this.on._formButtonClickDebounced = on(this.el, 'click', 'button', debounce(function() {
      if (this.value) {
        self[this.value]();
      }
    }, 500, true));

    this.on._formGlobalKey = e => {
      const key = e.keyCode;
      const aEl = document.activeElement;

      if ((key === 13 || key === 32) &&
        aEl &&
        (aEl.tagName === 'A' || aEl.tagName === 'BUTTON')) {
        aEl.click();
        return;
      }

      if (this[key]) {
        return this[key](e);
      }

      //note: tabs doesnt work properly on mac and safari
      if (key === 9) {
        e.preventDefault();
        const tabs = this.find('[tabindex]');
        const el = getTabActiveEl(tabs, !!e.shiftKey);

        if (el.type === 'radio') {
          el.checked = true;
        }

        el.focus();
      }

    }

    on(document, 'keydown', this.on._formGlobalKey);
  },

  removeForm: function() {
    off(this.el, 'click', this.on._formClick);
    off(this.el, 'click', this.on._formAClickDebounced);
    off(this.el, 'click', this.on._formButtonClickDebounced);
    off(document, 'keydown', this.on._formGlobalKey);
  }
}
