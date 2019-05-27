<p align="center">
  <a href="http://rn.mobile.ant.design">
    <img width="320" src="https://zos.alipayobjects.com/rmsportal/wIjMDnsrDoPPcIV.png">
  </a>
</p>

# Ant Design Mobile RN

Ant Design 移动端设计规范。`@sishu/antd-mobile-rn` 是 Ant Design 的移动规范的 React 实现，服务于蚂蚁及口碑无线业务。

## 通知

新版本`3.x`已经重构完成并发布，安装升级请查看 [更新日志](https://rn.mobile.ant.design/changelog-cn)

## 特性

- 基于 Ant Design 移动设计规范。
- 规则化的视觉样式配置，适应各类产品风格。
- 基于 React Native 的多平台支持。
- 使用 TypeScript 开发，提供类型定义文件。

## 演示

<img width="250" src="https://user-images.githubusercontent.com/1698185/27175806-f0a8a7f0-51f2-11e7-85fb-4b7ea9f89e5b.png" />

请先安装 expo app： https://expo.io/tools

## 安装 & 使用

```bash
npm install @sishu/antd-mobile-rn --save
```

or

```bash
yarn add @sishu/antd-mobile-rn
```

### 链接字体图标

```bash
react-native link @ant-design/icons-react-native
```

### 按需加载

```sh
$ yarn add babel-plugin-import -D
```

**babel.config.js:**

```js
plugins: [
  ['import', { libraryName: '@sishu/antd-mobile-rn' }],
],
```

### 使用 Modal、Toast

如果需要使用 `Modal` 以及 `Toast` 还需要在 App 的入口处加上 `Provider`:

```js
import React, { Component } from 'react';
import { Button, Provider, Toast } from '@sishu/antd-mobile-rn';

export default class HelloWorldApp extends Component {
  render() {
    return (
      <Provider>
        <Button onPress={() => Toast.info('This is a toast tips')}>
          Start
        </Button>
      </Provider>
    );
  }
}
```

[介绍](https://github.com/ant-design/ant-design-mobile-rn/blob/master/docs/react/introduce.zh-CN.md#%E5%AE%89%E8%A3%85)

## 链接

- [首页](http://rn.mobile.ant.design)
- [底层 React 模块](http://github.com/react-component)

## 欢迎贡献

有任何建议或意见您可以进行 [提问](http://github.com/ant-design/ant-design-mobile-rn/issues)。
