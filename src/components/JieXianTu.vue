<template>
    <div id="g6" ref="g6"></div>
</template>
<script>
  import G6 from '@antv/g6'
  import * as _ from 'lodash'
  import nodes from '../g6/nodes'

  _.keys(nodes).map(p => {
    G6.registerNode(p, nodes[p])
  })

  export default {
    name: 'JieXianTu',
    data () {
      return {
        _g6instance: null,
      }
    },
    mounted () {
      let size = { width: this.$refs.g6.clientWidth, height: this.$refs.g6.clientHeight }
      this.$data._g6instance = new G6.Graph({
        container: 'g6',
        ...size,
        modes: {
          default: ['drag-canvas', 'zoom-canvas', 'drag-node'], // 允许拖拽画布、放缩画布
        },
      })
      this.$data._g6instance.on('afterrender', () => {
        // 一些操作
        console.log('fitview')
        this.$data._g6instance.fitView(20)
      })
      this.$http.get('data/cim.json').then(res => {
        /*res.data.nodes.map(p => {
          p.anchorPoints = anchorPoints
          p.shapeControl = shapeControl
        })*/
        this.$data._g6instance.read(res.data)
        setTimeout(() => {
          let d1 = this.$data._g6instance.save()
          console.log(d1)
        }, 3000)
      })
    },
  }
</script>
<style scoped lang="less">
    #g6 {
        background: black;
        height: 100vh;
        width: 100vw;
    }
</style>
