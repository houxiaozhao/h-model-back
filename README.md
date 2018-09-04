# h-model-back

> 为模态框监听返回按钮的 vue 插件
> 可能有无数的 bug🙃（没有大量测试，只在自己电脑通过）

## Build Setup

```bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```

For detailed explanation on how things work, consult the [docs for vue-loader](http://vuejs.github.io/vue-loader).

## 使用，以 elementui 的 dialog 为例

```bash
yarn add h-model-back
```

#### 第一种（很多地方都用）

```javascript
import HModelBack from 'h-model-back';
Vue.use(HModelBack);
```

```html
<template>
<div>
<el-button type="text" @click="dialogVisible = true">点击打开 Dialog</el-button>
<el-dialog title="提示" :visible.sync="dialogVisible" width="30%" v-h-model-back:dialogVisible='dialogVisible'>
    <span>这是一段信息</span>
    </el-switch>
    <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
    </span>
</el-dialog>
</div>
</template>
<script>
export default {
  name: 'index',
  data() {
    return { dialogVisible: false};
  },
}
```

#### 第二种（用的地方少）

```html
<template>
<div>
<el-button type="text" @click="dialogVisible = true">点击打开 Dialog</el-button>
<el-dialog title="提示" :visible.sync="dialogVisible" width="30%" v-mymodel:dialogVisible='dialogVisible'>
    <span>这是一段信息</span>
    </el-switch>
    <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
    </span>
</el-dialog>
</div>
</template>
<script>
import HModelBack from 'h-model-back';
export default {
  name: 'index',
  data() {
    return { dialogVisible: false};
  },
  directives: {
    mymodel: HModelBack
  }
}
```

## 原理 `window.history.pushState`

在指令中监听模态框的是否现实的变量，

- 模态框弹出时

```javascript
window.history.pushState({}, '', getPushURL());
```

同时添加`popstate`监听

- 弹出框消失时，移除监听

```javascript
window.removeEventListener('popstate', handlePopstate);
window.location.href.indexOf('popup=') > -1 && history.back();
```

- 监听到点击返回按钮

```javascript
vnode.context[binding.expression] = false;
window.removeEventListener('popstate', handlePopstate);
```
