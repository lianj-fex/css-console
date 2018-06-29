这是什么？
======
> 这个库是实现console.log()支持 %c 占位符的特性的一个垫片

如何使用？
-----
```
const console = require('@lianj/css-console');
console.log('%c INFO ', 'background: red');
```

支持的CSS？
-------
- [x] background-color: hex
- [x] background-color: keyword
- [x] color: hex
- [x] color: keyword
- [x] background: hex (仅支持背景颜色)
- [x] background: keyword (仅支持背景颜色)
- [x] text-decorator: underline
- [x] font-weight: bold