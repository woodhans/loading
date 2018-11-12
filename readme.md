# jQuery.loading
### author [Hans.Wu](http://www.hanswu.com/project/jquery_loading.html "jQuery.loading")
===========================

    一款好用的页面预加载动画插件，用来预加载页面外部文件(图片、音频、视频、样式、javascript)。
    可以通过回调和css样式输出各种各样的动画。
    需要使用者掌握一定的css和js, jquery动画编程能力。

===========================

## 目录
* [准备工作](#准备工作)
* [参数设置](#参数设置)
* [动画效果Demo](#动画效果Demo)

## 准备工作
```
`引入js和css`
<link rel="stylesheet" href="%jspath%/jquery.loading.css" />
<script src="%jspath%/jquery.min.js"></script>
<script src="%jspath%/jquery.loading.min.js"></script>
```
```javascript
`body结束代码前加入js`
$(document).ready(function(){
    $(body).loading();          //此处body可以修改，加载loading动画的DOM
})
```
## 参数设置
```javascript
$(body).loading({
    items: [],                  //加载的文件列表
    loaded: null,               //加载完毕回调函数
    loadingTime: false,         //加载的时间
    loadingPercent: true,       //加载百分比
    loadingAnimate: true,       //加载百分比进度动画，如果为true，默认loading.gif
    loadingImg: false,          //loading动画gif图片
    customAnimate:false,        //用户自定义动画，可以css或js定义
    beforeLoading:null,         //加载开始前调用函数
    cancel:false,               //是否可以取消加载动画，如果可以，连按2次esc键，将取消加载动画。值可以是true或者是定义取消后的回调函数
});
```
```css
.loading-body{}                 /* 加载的外部主体样式 */
.loading-wrapper{}              /* 加载的动画主体样式 */
.loading-inner{}                /* 加载的动画内部显示内容样式 */
.loading-animate-bg{}           /* 加载的动画百分比进度背景样式 */
.loading-animate{}              /* 加载的动画百分比进度样式 */
.loading-img{}                  /* loading动画图片外层div样式 */
.loading-img img{}              /* loading动画图片样式 */
.loading-time{}                 /* 加载的时间显示样式 */
.loading-percent{}              /* 加载百分比显示样式 */
.loading-custom{}               /* 用户自定义动画样式 */
```
## 动画效果Demo


