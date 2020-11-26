export default {
  jsx (cfg) {
    return `
    <group>
      <rect style={{
        width: 100, height: 50, fill: 'rgba(1,1,1,0)', stroke: 'red', radius: [1,1,1,1]
      }} keyshape="true" name="test">
        <text style={{
          marginTop: 16,
          marginLeft: 50,
          textAlign: 'center',
          fontWeight: 'bold',
          fontSize:18,
          fill: '#fff' }}
          name="title">${cfg.label || cfg.id}</text>
      </rect>
    </group>
`
  },
  getAnchorPoints (cfg) {
    return cfg.anchorPoints || []
  },
}
