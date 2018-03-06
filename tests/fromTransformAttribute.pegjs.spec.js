import {assert} from 'chai'
import {parse} from '../src/fromTransformAttribute.autogenerated'

//credits: github:nidu/svg-transform-parser

describe('fromTransformAttribute.pegjs', () => {
  describe('atomic transformations', () => {
    it('should parse single matrices', () => {
      assert.deepEqual(
        parse("translate(1.6,65.44)"),
        [{type: 'translate', tx: 1.6, ty: 65.44}]
      )

      assert.deepEqual(
        parse("translate(777)"),
        [{type: 'translate', tx: 777}]
      )

      assert.deepEqual(
        parse("rotate(51)"),
        [{type: 'rotate', angle: 51}]
      )

      assert.deepEqual(
        parse("rotate(46 51, 18.57)"),
        [{type: 'rotate', angle: 46, cx: 51, cy: 18.57}]
      )

      assert.deepEqual(
        parse("skewX(19.08)"),
        [{type: 'skewX', angle: 19.08}]
      )

      assert.deepEqual(
        parse("skewY(56.11)"),
        [{type: 'skewY', angle: 56.11}]
      )

      assert.deepEqual(
        parse("matrix(1 2 3,4,5 6)"),
        [{type: 'matrix', a: 1, b: 2, c: 3, d: 4, e: 5, f: 6}])
    });

    it('should throw exception', () => {
      assert.throws(parse.bind(this, "rotate(46 51)"))
      assert.throws(parse.bind(this, "skewX(19.08, 4)"))
      assert.throws(parse.bind(this, "matrix(1 2 3,45 6)"))
    })
  })


  describe('complex transformations', () => {
    it('should parse in the right order', () => {
      assert.deepEqual(
        parse("translate(1,2) translate(3,4) translate(5,6)"),
        [
          {type: "translate", tx: 1, ty: 2},
          {type: "translate", tx: 3, ty: 4},
          {type: "translate", tx: 5, ty: 6},
        ]
      )
    })

    it('should parse multiple matrices', () => {
      assert.deepEqual(
        parse("translate(1,-1),rotate(2 0.2 0.5) skewX(3.3)  skewY(4),matrix(6,5,4,3,2,1)"),
        [
          {type: "translate", tx: 1, ty: -1},
          {type: "rotate", angle: 2, cx: 0.2, cy: 0.5},
          {type: "skewX", angle: 3.3},
          {type: "skewY", angle: 4},
          {type: "matrix", a: 6, b: 5, c: 4, d: 3, e: 2, f: 1}
        ]
      )
    })
  })
})
