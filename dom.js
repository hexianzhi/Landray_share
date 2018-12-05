
// 步骤一：用JS对象模拟DOM树

var el = require('./element');
var ul = el('ul', { id: 'list' }, [
  el('li', { class: 'item' }, ['Item 1']),
  el('li', { class: 'item' }, ['Item 2']),
  el('li', { class: 'item' }, ['Item 3'])
]);

Element.prototype.render = function () {

  // 第一步：根据tagName构建
  var el = document.createElement(this.tagName) 
  var props = this.props

  // 第二步：设置节点的DOM属性
  for (var propName in props) { 
    var propValue = props[propName]
    el.setAttribute(propName, propValue)
  }

  var children = this.children || []

  children.forEach(function (child) {
    // 如果子节点也是虚拟DOM，递归构建DOM节点，如果字符串，只构建文本节点
    var childEl = (child instanceof Element) ? child.render() : document.createTextNode(child) 
    el.appendChild(childEl)
  })

  return el
}

var ulRoot = ul.render()
document.body.appendChild(ulRoot)
/** 
 * <ul id='list'>
  <li class='item'>Item 1</li>
  <li class='item'>Item 2</li>
  <li class='item'>Item 3</li>
</ul>
*/