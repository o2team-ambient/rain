## 使用方法

```
jnpm i @o2team/ambient-rain --save
```

```javascript
import ATAmbient from '@o2team/ambient-rain'

ATAmbient({
  textures: [
    '//img11.360buyimg.com/ling/s40x40_jfs/t18934/336/2145230261/6595/a1c52247/5ae921e6N79e26545.png',
    '//img30.360buyimg.com/ling/jfs/t18592/258/2135046772/2474/e4166c50/5ae921e6N7623e094.png',
    '//img10.360buyimg.com/ling/jfs/t18532/280/2176785009/1792/f7cc83e0/5ae921e6Nd84de3c1.png',
    '//img14.360buyimg.com/ling/jfs/t18775/80/2112504289/658/2b47a3d1/5ae921e6Ndc314839.png',
    '//img14.360buyimg.com/ling/jfs/t16747/303/2236365706/1123/bb04eee4/5ae921e6N481f83b2.png',
    '//img10.360buyimg.com/ling/jfs/t16639/109/2164752267/633/3a5c2c27/5ae921e6Nc0921505.png',
    '//img20.360buyimg.com/ling/jfs/t18970/64/2126101196/851/87281db2/5ae921e6N38d0ed61.png',
    '//img11.360buyimg.com/ling/s40x40_jfs/t19396/55/2198582218/17715/93071bdb/5ae921e6N3fa9bad1.png'
  ]
})
```

## 配置说明

| 字段 | 类型 | 可选值 | 效果 |
|-|-|-|-|
| num | `number` | - | 粒子个数（暂无） |
| offset | `number` | `true`, `false` | 是否循环（暂无） |
| durtaion | `number` | - | 掉落时间（秒）（暂无） |
| stagger | `number` | `true`, `false` | 是否循环（暂无） |
| bgColor | `string` | hex 色值（不带 `#`） | 背景色（暂无） |
| bgOpacity | `number` | 0-100 | 背景色透明度（暂无） |
| textures | `array<string>` | - | 粒子素材列表 |

## 预览地址

https://o2team-ambient.github.io/rain/dist/?controller=1

## 项目结构

```
├── config                  - 编译配置
│   ├── base.conf.js
│   └── custom.conf.js
├── info.json               - 组件信息
└── src
    ├── css
    │   ├── base.scss
    │   └── package.scss
    ├── index.ejs
    ├── index.js            - 主入口文件
    ├── rollup_index.js     - npm 包主入口文件
    ├── config.js           - 控制板参数配置文件（单独打包）
    ├── control.js          - 控制板入口文件（单独打包）
    └── js
        ├── ambient.js      - 动效初始化入口
        ├── controlinit.js  - 控制板自定义代码
        └── utils
            ├── const.js    - 字段常数
            ├── raf.js
            └── util.js
```

> 开发完毕之后，请新建 gh-pages 分支并 push --set-upstream，以获得线上 demo 页。每次更新后，测试完成即可合并至 gh-pages 发布。