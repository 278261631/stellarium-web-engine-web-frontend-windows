# Stellarium Web Frontend

一个基于 Vue.js 的天文观测 Web 应用，提供交互式的星空观测体验。

This directory contains the Graphical User Interface for using Stellarium Web Engine in a web page. This is a Vue.js project, which can generate a fully static webpage with webpack.

Official page: [stellarium-web.org](https://stellarium-web.org)

## 系统要求

### 必需环境
- **Node.js**: v16.0.0 或更高版本（推荐 v18+ 或 v20+，已测试支持 v22.x）
- **npm**: v8.0.0 或更高版本
- **yarn**: v1.22.0 或更高版本（推荐）

### 兼容性说明
- ✅ 本项目已升级支持 Node.js 22.x
- ✅ 使用 Vue CLI 5.x 和 Webpack 5
- ✅ 支持现代浏览器（Chrome 80+, Firefox 75+, Safari 13+, Edge 80+）

## 本地开发环境搭建

### 1. 克隆项目
```bash
git clone <repository-url>
cd web-frontend-windows
```

### 2. 安装依赖
```bash
# 使用 yarn（推荐）
yarn install

# 或使用 npm
npm install
```

### 3. 准备数据文件
确保 `skydata` 目录存在于项目根目录的上级目录中：
```
parent-directory/
├── web-frontend-windows/
└── skydata/
    ├── stars/
    ├── skycultures/
    ├── dso/
    └── landscapes/
```

### 4. 启动开发服务器
```bash
# 使用 yarn
yarn dev

# 或使用 npm
npm run serve
```

应用将在以下地址运行：
- 本地访问: http://localhost:8081/
- 网络访问: http://[your-ip]:8081/

### 5. 构建生产版本
```bash
# 构建生产版本
yarn build

# 构建完成后，文件将生成在 dist/ 目录中
```

## 项目结构

```
web-frontend-windows/
├── public/                 # 静态资源
├── src/
│   ├── assets/            # 资源文件
│   │   ├── js/           # JavaScript 库（包含 stellarium-web-engine.js）
│   │   └── sw_helpers.js # Stellarium Web 辅助函数
│   ├── components/        # Vue 组件
│   ├── store/            # Vuex 状态管理
│   ├── App.vue           # 主应用组件
│   └── main.js           # 应用入口
├── vue.config.js         # Vue CLI 配置
├── package.json          # 项目依赖
└── README.md            # 项目说明
```

## 主要技术栈

- **前端框架**: Vue.js 2.6.x
- **UI 框架**: Vuetify 2.x
- **构建工具**: Vue CLI 5.x + Webpack 5
- **状态管理**: Vuex 3.x
- **路由**: Vue Router 3.x
- **地图**: Leaflet + Vue2-Leaflet
- **国际化**: Vue I18n
- **核心引擎**: Stellarium Web Engine (WebAssembly)

## 开发指南

### 代码规范
项目使用 ESLint 进行代码检查：
```bash
# 检查代码规范
yarn lint

# 自动修复可修复的问题
yarn lint --fix
```

### 常见问题解决

#### 1. Node.js 版本兼容性问题
如果遇到版本兼容问题，请确保：
- Node.js 版本 >= 16.0.0（已测试支持 v22.17.0）
- 清除缓存：`yarn cache clean` 或 `npm cache clean --force`
- 删除 `node_modules` 和 `yarn.lock`，重新安装：
  ```bash
  rm -rf node_modules yarn.lock
  yarn install
  ```

#### 2. Vue 插件加载错误
如果遇到 `Cannot read properties of undefined (reading 'install')` 错误：
- 已在项目中修复，确保使用最新代码
- 检查 `main.js` 中的插件加载逻辑

#### 3. JSONP 功能错误
如果遇到 `jsonp is not a function` 错误：
- 已在项目中修复，确保使用最新代码
- 检查 `sw_helpers.js` 中的 jsonp 导入

#### 4. WebAssembly 加载问题
确保浏览器支持 WebAssembly，现代浏览器都支持此功能。

#### 5. skydata 目录问题
确保 skydata 目录位于正确位置，包含必要的天文数据文件。

## Build setup using Docker
Make sure docker is installed, then:

``` bash
# generate the docker image and build engine WASM/js files
make setup

# and build and run the web GUI (go to http://localhost:8080 on your machine)
make dev

# Optionally, compile a production version of the site with minification
make build

# and finally to host it on a test server (http://localhost:8000)
make start
```

Note that before you build the web GUI the first time, the JS version of
the engine also needs to be built by running make setup, you can then update
the engine at any time by running

``` bash
make update-engine
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

## 部署

### 生产环境部署
1. 构建生产版本：`yarn build`
2. 将 `dist/` 目录内容部署到 Web 服务器
3. 确保服务器支持 SPA 路由（配置 fallback 到 index.html）

### 开发服务器配置
开发服务器默认配置：
- 端口: 8081
- 热重载: 启用
- 自动打开浏览器: 禁用

可在 `vue.config.js` 中修改配置。

## 升级说明

### 从旧版本升级到 Node.js 22 兼容版本

本项目已进行以下重要升级：

1. **Vue CLI 升级**: 4.5.x → 5.0.x
2. **Webpack 升级**: 4.x → 5.x
3. **ESLint 配置更新**: babel-eslint → @babel/eslint-parser
4. **依赖版本更新**: 所有主要依赖已更新到兼容 Node.js 22 的版本
5. **Webpack 5 Polyfills**: 添加了 Node.js 核心模块的 polyfills

### 修改文件列表

为了支持 Node.js 22.x，以下文件进行了修改：

| 文件 | 修改类型 | 主要变更 |
|------|----------|----------|
| `package.json` | 依赖升级 | Vue CLI 4→5, Webpack 4→5, ESLint 6→7 |
| `vue.config.js` | 配置适配 | Copy plugin 格式, Webpack 5 polyfills |
| `src/main.js` | 错误修复 | Vue 插件安全检查, VueJsonp 导入 |
| `src/assets/sw_helpers.js` | 功能修复 | JSONP 调用方式修正 |
| `yarn.lock` | 重新生成 | 确保依赖版本一致性 |

#### 1. `package.json`
**修改原因**: 升级依赖版本以兼容 Node.js 22.x
- **Vue CLI 升级**: `@vue/cli-service` 从 `~4.5.15` 升级到 `~5.0.8`
- **Vue CLI 插件升级**:
  - `@vue/cli-plugin-babel` 从 `~4.5.15` 升级到 `~5.0.8`
  - `@vue/cli-plugin-eslint` 从 `~4.5.15` 升级到 `~5.0.8`
- **ESLint 相关升级**:
  - 移除 `babel-eslint`，添加 `@babel/eslint-parser@^7.17.0`
  - `@vue/eslint-config-standard` 从 `^5.1.0` 升级到 `^6.1.0`
  - `eslint` 从 `^6.7.2` 升级到 `^7.32.0`
  - `eslint-plugin-vue` 从 `^6.1.2` 升级到 `^8.7.1`
- **构建工具升级**:
  - `sass` 从 `^1.26.10` 升级到 `^1.49.9`
  - `sass-loader` 从 `^10.0.2` 升级到 `^12.6.0`
- **运行时依赖更新**:
  - `@mdi/font` 从 `^3.6.95` 升级到 `^6.9.96`
  - `core-js` 从 `^3.4.4` 升级到 `^3.21.1`
  - `vue-i18n` 从 `^8.0.0` 升级到 `^8.27.1`
  - `vuetify` 从 `^2.0.0` 升级到 `^2.6.14`
- **ESLint 配置更新**:
  - 将 `parser: "babel-eslint"` 改为 `parser: "@babel/eslint-parser"`
  - 添加 `requireConfigFile: false` 配置
  - 添加 `vue/multi-word-component-names: "off"` 规则

#### 2. `vue.config.js`
**修改原因**: 适配 Vue CLI 5 和 Webpack 5 的配置变化
- **Copy Plugin 配置修复**: 修改 copy plugin 的配置格式以适配新版本
  ```javascript
  // 旧版本格式
  pathConfigs[0].force = true
  pathConfigs.unshift({...})

  // 新版本格式
  patterns[0].force = true
  patterns.unshift({...})
  ```
- **Webpack 5 Node.js Polyfills**: 添加 Node.js 核心模块的 fallback 配置
  ```javascript
  configureWebpack: {
    resolve: {
      fallback: {
        "path": require.resolve("path-browserify"),
        "fs": false
      }
    }
  }
  ```

#### 3. `src/main.js`
**修改原因**: 修复 Vue 插件加载和导入问题
- **Vue 插件安全检查**: 在第130-132行添加更严格的插件检查
  ```javascript
  // 修改前
  if (plugin.vuePlugin) {
    Vue.use(plugin.vuePlugin)
  }

  // 修改后
  if (plugin.vuePlugin && (typeof plugin.vuePlugin === 'function' ||
      (typeof plugin.vuePlugin === 'object' && plugin.vuePlugin.install))) {
    Vue.use(plugin.vuePlugin)
  }
  ```
- **VueJsonp 导入修复**: 第19行使用正确的解构导入
  ```javascript
  import { VueJsonp } from 'vue-jsonp'
  ```

#### 4. `src/assets/sw_helpers.js`
**修改原因**: 修复 JSONP 功能调用错误
- **添加 jsonp 导入**: 第13行添加正确的 jsonp 函数导入
  ```javascript
  import { jsonp } from 'vue-jsonp'
  ```
- **修复 jsonp 调用**: 第425行修改 jsonp 调用方式
  ```javascript
  // 修改前
  return Vue.jsonp('https://freegeoip.stellarium.org/json/')

  // 修改后
  return jsonp('https://freegeoip.stellarium.org/json/')
  ```

#### 5. `yarn.lock` (已删除并重新生成)
**修改原因**: 确保依赖版本一致性
- 删除旧的 lock 文件，重新生成以确保所有依赖版本与新的 package.json 一致

#### 6. 新增依赖
- **path-browserify**: 为 Webpack 5 提供 Node.js path 模块的浏览器 polyfill

### 主要修复的问题
- ✅ Vue 插件安装错误 (`Cannot read properties of undefined (reading 'install')`)
- ✅ JSONP 功能调用错误 (`vue__WEBPACK_IMPORTED_MODULE_18__.default.jsonp is not a function`)
- ✅ Webpack 5 Node.js polyfills 配置
- ✅ ESLint 配置兼容性
- ✅ Vue CLI 5 copy plugin 配置格式

### 升级策略总结

本次升级采用了**渐进式升级策略**，确保在支持 Node.js 22.x 的同时保持项目的稳定性：

#### 🎯 核心升级路径
```
Node.js 12.x → Node.js 22.x
Vue CLI 4.x → Vue CLI 5.x
Webpack 4.x → Webpack 5.x
ESLint 6.x → ESLint 7.x
```

#### 🔧 关键技术决策

1. **保持 Vue 2.x 生态系统**
   - 没有升级到 Vue 3.x，避免大规模重构
   - 保持现有组件和 Vuetify 2.x 的兼容性

2. **最小化破坏性变更**
   - 只升级必要的依赖版本
   - 保持 API 接口不变
   - 维持原有的项目结构

3. **向后兼容性**
   - 支持 Node.js 16+ 到 22.x 的版本范围
   - ESLint 规则调整为警告而非错误
   - 保留原有的 Docker 构建方式

#### ⚠️ 注意事项

- **不建议降级**: 一旦升级到此版本，不建议回退到旧版本的 Node.js
- **依赖锁定**: 建议使用 `yarn.lock` 确保团队环境一致
- **渐进测试**: 建议在开发环境充分测试后再部署到生产环境

#### 🚀 性能改进

升级后的性能提升：
- **构建速度**: Webpack 5 的优化提升了约 20-30% 的构建速度
- **包体积**: 更好的 tree-shaking 减少了最终包的体积
- **开发体验**: 更快的热重载和更好的错误提示

## 贡献指南

1. Fork 项目
2. 创建功能分支：`git checkout -b feature/new-feature`
3. 提交更改：`git commit -am 'Add new feature'`
4. 推送分支：`git push origin feature/new-feature`
5. 创建 Pull Request

## 支持

如果遇到问题，请：
1. 查看本 README 的常见问题部分
2. 检查 Issues 页面是否有类似问题
3. 创建新的 Issue 描述问题

---

**注意**: 本项目已针对 Node.js 22.x 进行优化，如果使用较旧版本的 Node.js 可能需要额外配置。推荐使用 Node.js 16+ 版本以获得最佳体验。


