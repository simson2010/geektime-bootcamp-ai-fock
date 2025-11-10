# Instructions

## project alpha 需求和设计文档

构建一个一个简单的，使用标签分类和管理 ticket 的工具。它基于 Postgres 数据库，使用 Fast API 作为后端，使用 Typescript/Vite/Tailwind/Shadcn 作为前端。无需用户系统，当前用户可以：

- 创建/编辑/删除/完成/取消完成 ticket
- 添加/删除 ticket 的标签
- 按照不同的标签查看 ticket 列表
- 按 title 搜索 ticket

按照这个想法，帮我生成详细的需求和设计文档，放在 ./specs/w1/0001-spec.md 文件中，输出为中文。

## implementation plan

按照 ./specs/w1/0001-spec.md 中的需求和设计文档，生成一个详细的实现计划，放在 ./specs/w1/0002-implementation-plan.md 文件中，输出为中文。

## phased implementation

按照 ./specs/w1/0002-implementation-plan.md 完整实现这个项目的 phase 1 代码

## seed sql

添加一个 seed.sql 里面放 50个 meaningful 的 ticket 和几十个tags（包含platform tag，如 ios，project tag 如 viking，功能性 tag 如 autocomplete，等等）。要求 seed 文件正确可以通过 psql 执行。

## 优化 UI

按照 apple website 的设计风格，think ultra hard，优化 UI 和 UX。
