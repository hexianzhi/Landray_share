// diff 函数，对比两棵树
function diff (oldTree, newTree) {
    // 当前节点的标志
    var index = 0 

    // 用来记录每个节点差异的对象
    var patches = {} 
    
    dfsWalk(oldTree, newTree, index, patches)
    return patches
  }
  
  // 对两棵树进行深度优先遍历
  function dfsWalk (oldNode, newNode, index, patches) {
    // 对比oldNode和newNode的不同，记录下来。没有不同啊..??
    // var currentPatch[] = []

    // Node is removed.
    if (newNode === null) {
        // Real DOM node will be removed when perform reordering, so has no needs to do anthings in here
    } else if (_.isString(oldNode) && _.isString(newNode)) {

        // TextNode 改变
        if (newNode !== oldNode) currentPatch.push({ type: patch.TEXT, content: newNode })

    } else if (oldNode.tagName === newNode.tagName && oldNode.key === newNode.key) {

        // Nodes are the same, diff old node's props and children
        // Diff props
        var propsPatches = diffProps(oldNode, newNode)
        if (propsPatches) { currentPatch.push({ type: patch.PROPS, props: propsPatches })}

        // Diff children. If the node has a `ignore` property, do not diff children
        if (!isIgnoreChildren(newNode)) diffChildren(oldNode.children,newNode.children,index,patches,currentPatch)

    } else {
        // Nodes are not the same, replace the old node with new node
        currentPatch.push({ type: patch.REPLACE, node: newNode })
    }

    if (currentPatch.length) {
        patches[index] = currentPatch
    }
            
    // 遍历子节点
    diffChildren(oldNode.children, newNode.children, index, patches)
  }
  
  // 遍历子节点
  function diffChildren (oldChildren, newChildren, index, patches) {
    var leftNode = null
    var currentNodeIndex = index
    oldChildren.forEach(function (child, i) {
      var newChild = newChildren[i]
      
      // 计算节点的标识
      currentNodeIndex = (leftNode && leftNode.count) ? currentNodeIndex + leftNode.count + 1 : currentNodeIndex + 1
      
      // 深度遍历子节点
      dfsWalk(child, newChild, currentNodeIndex, patches) 
      
      leftNode = child
    })
  }

// 差异例子：
// 上面的div和新的div有差异，当前的标记是 0
patches[0] = [{difference}, {difference}, ...] 
// 用数组存储新旧节点的不同
//同理p是patches[1]，ul是patches[3]，类推。