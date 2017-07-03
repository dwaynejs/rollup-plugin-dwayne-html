import { Block, Class } from 'dwayne';

var _tmpl$1;

var tmpl$1 = (_tmpl$1 = [
  {
    type: "div",
    children: [
      {
        type: "#text",
        value: function (_) {
          return _.text;
        }
      }
    ]
  }
], _tmpl$1.vars = ["text"], _tmpl$1);

class MyBlock extends Block {
  static get html() {
    return tmpl$1;
  }
}

var _tmpl;
var _mixin;

var tmpl = (_tmpl = [
  {
    type: "div",
    children: [
      {
        type: "span",
        args: {
          "Class:active": (_mixin = function (_) {
            return _.active;
          }, _mixin.mixin = Class, _mixin)
        },
        children: [
          {
            type: "#text",
            value: function (_) {
              return _.text;
            }
          }
        ]
      },
      {
        type: MyBlock,
        args: {
          __source: "test/fixtures/nested/index.html:10:3"
        }
      }
    ]
  }
], _tmpl.vars = ["active", "text"], _tmpl);

console.log(tmpl);
