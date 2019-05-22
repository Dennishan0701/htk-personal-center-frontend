# 写代码之前请先看看这里

## 运行项目

运行项目的方法在文件的最低部

## 代码风格

本项目由 eslint 进行代码风格限制，在 airbnb 的开发风格的基础上做了适当修改，如果风格有误，则 npm 运行报错。  
推荐使用 Visual Studio Code IDE，已经在/.vscode/settings.json 里配置了 vs code 的设置文件，在安装好 ESLint 的前提下，它会自动帮你修正代码风格。请勿修改提交这个文件。

## GIT

暂时项目有两个分支，master 和 dev，未来你可以分叉一个自己的开发分支，在完成一个功能后，用 **非快进合并** 的方式合并到 dev 分支，master 分支作为发布分支，在一个版本稳定后直接用 dev 替换 master。
因为项目需要，现在开设一个新的分支 recommended，用于开发一个未来上线的推荐功能。  
**请千万不要擅自把 recommended 分支合并到 dev 和 master 分支，合并前请咨询产品经理和 dev 分支的开发者**
把 dev 分支合并到 recommended 分支
```
git checkout recommended
git merge --no-ff dev
```

### 注意

1. **console.log 等调试代码请不要提交到 dev 上面！！！**
2. **每次 commit 都要简单写一下实现了什么功能，请勿写意义不明的日期和数字**
3. **请妥善处理合并冲突！！**
4. **如果一个功能还没开发结束，请勿合并代码到 dev 分支！！**

在发生冲突时，不要着急删除冲突的代码，根据提示确认冲突的代码是谁写的，先理解冲突对方的代码的意图再去处理，推荐是把对方叫到跟前一起处理发生的冲突。  
推荐使用 vs code 的 GitLens 插件，可以厘清每一行代码是谁写的

关于第 4 点，开发未完成，你只需要 dev 合并到自己的分支，而不需要更新 dev 分支，用终端来执行是这样子的。

```base
# 当前处在你的开发分支 yourDev
git merge --no-ff dev
```

现在有很多很方便的 git 管理工具，但是请不要看到按钮顺手就点，要理解点击这个按钮后发生了什么，是不是会对别人的代码造成影响，推荐使用终端进行代码合并。

```base
# 基于当前分支复制新建自己的分支并跳转(假设当前处在dev分支)
git checkout -b youDev

# 查看自己分支的状态
git status

# 添加文件到暂存区
git add ./index.htm

# 添加所有修改过的文件到暂存区(不要滥用)
git add .

# commit
git commit -m '修改了xxx bug，写了xx功能'

# 将dev分支的新内容合并到当前个人开发分支
git pull
git merge --no-ff dev

# 将个人开发分支的新内容合并到dev分支
git checkout dev
git pull
git merge --no-ff yourDev
git push
git checkout yourDev
```

## 模块化

本项目遵循模块化、结构化、面向对象的开发理念。具体来说就是  
每个前端页面拆分为数个 vue 组件。  
处理数据的 js 代码尽量通过 export import 的方式提取到单独的 js 文件里。  
API 在父组件里请求，然后在外部 js 里把数据整理好传如到子组件里。  
其实更推荐在外部 js 里直接请求 API，最后返回需要的数据。  
css 个人习惯于直接写入 vue 文件里，但无论怎么样，注意不要污染全局的 css，在 vue 的 style 部分记得写入 scoped 参数，class 写复杂但易懂的命名，例如

```css
<style scoped>
@import "./css/infoList.css";
.center-page-header {
  display: flex;
  align-items: center;
  flex-direction: column;
  padding-bottom: 0.1rem;
}
</style>
```

## API

### API 请求方法

本项目的请求请放在/src/api/requestList.js 里，按照里面的格式进行写新的请求函数。  
参考其他页面，在页面里引用并调取该函数  
这样做的好处是

1. 所有请求集中在一起处理，有很多东西可以共用。
2. 可以在发送给页面之前先进行数据整理，去掉无用的数据。
3. 统一处理请求失败的问题。
4. 假设未来某天后台 api 发生了巨大的变化，也不用修改页面里面的代码，在这个文件里进行相应的处理就行。

### 理念

api 请求的理念是不要相信任何人，用户在实际使用 api 可能遇到龟速、无信号、后台代码错乱甚至删库跑路等等各种情况，你唯一能相信的是自己的代码，做好各种情况下的数据保护、做好仅必要且清晰的提示。因为网页出问题的时候，第一个找的是前端而不是后端。

### axios

本项目使用 axios 作为 HTTP 库，它在/src/api/axios.js 进行拦截及封装请求头。

如果有必要，在 vue 文件里直接这样写就行（不推荐）

```javascript
this.axios.post(url);
```

### url

所有的请求 url 请写入这个文件里 /src/api/apiList.js

### main url 主链接

主链接在全局变量里面配置，简单来说就是在/.env.development /.env.production 文件配置好的变量，如果没有必要，请勿修改上传这个两个全局变量。

如果你需要对接别的服务器，你可以在自行配置自己的全局变量。  
在项目根目录下新建一个文件名为 .env.development.local 的文件，按照/.env.development /.env.production 自行配置全局变量。  
该文件不会被 git 提交，请自行保存好。

## VUEX

这个项目的 vuex 直接保存在 localstorage，所以没有必要的数据不要保存在 vuex 里面，特别是占空间大的数据。在手动清除 localstorage 数据的时候，要顺便把 vuex 的数据清除，或者直接清除 vuex 的数据。

## rem 布局

本项目使用 rem 布局，请在css里面尽量去使用rem单位，请不要用px作为单位。  

## 图片
图片占空间越来越大，未来会转移至外部去。  

## 运行项目

```
# 安装依赖
npm install
# 运行项目
npm run away
# 生产部署
npm run build
# 代码风格检测
npm run lint
```
