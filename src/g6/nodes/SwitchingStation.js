function calc (cfg) {
  let anchorPoints = [] // 目前的连接点，全部放到开始
  let anchorPointsChild = [] // 母线上的接入点，放到后面
  let busCount = cfg.busCount || 2 // 有几条母线
  let busChildCount = cfg.busChildCount || 4
  let width = 100 // 节点宽度
  let padding = 15 // 节点内部边距
  let textHeight = 40 // 顶部节点名称的高度
  let linkOffset = 10 // 母线连接线的偏移距离
  let paths = []
  let busLong = 150 // 母线的长度
  let busSpace = 20 // 母线之间的间隔距离

  let height = busLong * busCount + busSpace * (busCount - 1) + textHeight +
    padding
  for (let i = 0; i < busCount; i++) {
    // 画母线
    let start = textHeight + i * (busLong + busSpace)
    let end = textHeight + (i + 1) * busLong + i *
      busSpace
    paths.push(
      `['M', ${width - padding}, ${start}]`)
    paths.push(
      `['L', ${width - padding}, ${end}]`)
    anchorPoints.push([
      (width - padding) / width,
      (textHeight + i * busSpace + busLong / 2 + (i == 0 ? 0 : i * busLong)) /
      height])

    if (i > 0) {
      // 添加连接线
      paths.push(
        `['M', ${width - padding}, ${start - busSpace - linkOffset}]`)
      paths.push(
        `['L', ${padding}, ${start - busSpace - linkOffset}]`)

      paths.push(
        `['M', ${padding}, ${start - busSpace - linkOffset - 1}]`)
      paths.push(
        `['L', ${padding}, ${start + linkOffset + 1}]`)

      paths.push(
        `['M', ${width - padding}, ${start + linkOffset}]`)
      paths.push(
        `['L', ${padding}, ${start + linkOffset}]`)
    }

    //每条母线对外的接入点
    for (let j = 0; j < busChildCount; j++) {
      let k = (busLong - 2 * linkOffset) / busChildCount
      let k2 = linkOffset + k * j
      let k3 = start + k2
      anchorPointsChild.push([(width - padding) / width, k3 / height])
    }
  }
  console.log(paths.join(','))
  console.log(anchorPointsChild.join(','))
  return { width, height, anchorPoints, anchorPointsChild, paths }
}

export default {
  jsx (cfg) {
    let { width, height, paths } = calc(cfg)
    return `
      <group>
        <rect style={{
          width: ${width}, height: ${height}, fill: 'rgba(1,1,1,0)', stroke: 'red', radius: [1,1,1,1]
        }} keyshape="true" name="test">
          <text style={{
            marginTop: 10,
            marginLeft: 50,
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize:10,
            fill: '#fff' }}
            name="title">${cfg.label || cfg.id}
          </text>
          <path style={{
            lineWidth: 2,
            lineJoin:'round',
            path:${'[' + paths.join(',') + ']'},
            stroke: 'red' }}
            name="bus1"/>
        </rect>
      </group>
     `
  },
  getAnchorPoints (cfg) {
    let { anchorPoints, anchorPointsChild } = calc(cfg)
    return [...anchorPoints, ...anchorPointsChild] || cfg.anchorPoints
  },
}
