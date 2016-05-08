##gulp-seed-master
gulp是前端开发过程中对代码进行构建的工具，是自动化项目的构建利器，基于Nodejs的自动任务运行器， 能自动化地完成 javascript/coffee/sass/less/html/image/css 等文件的的测试、检查、合并、压缩、格式化、浏览器自动刷新、部署文件生成，并监听文件在改动后重复指定的这些步骤。
此项目的存在意义是希望成为一个基于gulp操作的种子文件，在新的项目搭建的过程中，可以省略一些不必要的基本操作（标准的文件夹目录创建、package.json、gulp.js创建及操作等）

##项目安装步骤

* 首先本地安装nodejs
* 可选装 cnpm ，cnpm的操作跟npm一样，是一个完整 npmjs.org 镜像

    ```javascript
    cnpm install cnpm -g --registry=https://registry.npm.taobao.org
    ```

* 全局安装gulp，cnpm install gulp -g
* cmd cd 至项目根目录，执行cnpm install，安装package.json文件中的所有本地node依赖库

##项目编译/监视步骤
###编译文件

```javascript
  gulp clean//清理编译的文件
  gulp build:css//编译sass至dist/css文件夹
  gulp build:js//合并压缩js文件至dist/js文件夹
  gulp build:images//压缩image至dist/images文件夹
  gulp build:all//编译所有文件
  
```
###监视文件

```javascript
  gulp watch:css//监视文件变化时，编译sass至dist/css文件夹
  gulp watch:js//监视文件变化时，合并压缩js文件至dist/js文件夹
  gulp watch:images//监视文件变化时，压缩image至dist/images文件夹
  gulp watch:all//监视文件变化时，编译所有文件
  
```

##关于作者

```javascript
  var ihubo = {
    nickName  : "felixpan",
    site : "http://github.com/pmg1989"
  }
```
