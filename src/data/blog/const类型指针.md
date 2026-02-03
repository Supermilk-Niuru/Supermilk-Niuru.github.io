---
author: Supermilk-Niuru
pubDatetime: 2026-02-03T00:00:00Z
title: const类型指针
postSlug: c++-pointers-note
featured: false
tags: ['C++']
description: const类型指针
---
 如果要查找指针其他相关笔记,**请点击☞**[C语言部分知识点-指针](https://github.com/Supermilk-Niuru/Learn-C-language/blob/main/C%E8%AF%AD%E8%A8%80-%E9%83%A8%E5%88%86%E7%9F%A5%E8%AF%86%E7%82%B9/%E6%8C%87%E9%92%88.md)
### const类型指针
###### 常量指针
```C
int a = 0;
int b = 100;
const int * p = &a;
p = &b;
```
* 可对指针的指向进行修改
* **不可**对指针指向的值进行修改

###### 指针常量
```C
int a = 0;
int * const p = &a;
```
* 可对指针指向的值进行修改
* **不可**对指针的指向进行修改

###### 第三种类型
`const int * const p = &a;`
* 都不可修改