>本项目使用class-style Vue components。语法参考:[vue-class-component](https://github.com/vuejs/vue-class-component)，[vue-property-decorator](https://github.com/kaorun343/vue-property-decorator)
* * *

#### Widget配置方法

1. 新增weiget组件需继承`@/mixins/WidgetMixin`或者手动提供getConfig方法向外暴露组件props。组件props如果为全部为number|string|boolean类型，则无需提供额外编辑模板。
1. 在`@/Widget/index.ts`中添加控件描述
1. 在`@/register.ts`中注册控件
1. 在`@/translate.ts`中添加props中文映射
1. 如果开启enableCustomTemplate，需要在`@/Widget/propEditor`中编写对应控件的模板，模板文件名需与weiget的compName(z-name)的name部分相等。模板需继承`@/mixins/PropEditorMixin`或者手动$emit change事件

* * *

**控件描述：**
| 参数 | 描述 |
| :---: | :---: |
| name(String) | 控件名称 |
| component(String) | 控件的compName(z-name) |
| container(Boolean) | 是否为容器控件 |
| type(String) | 控件种类 |
| enableCustomTemplate(Boolean) | 是否启用自定义编辑模板 |