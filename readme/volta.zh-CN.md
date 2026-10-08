## 安装 Volta

使用 Volta 安装 Node.js 并在不同版本之间切换，不需要管理员权限。

不过，安装 Volta 本身时，如果拥有管理员权限会更方便。

[安装 Volta 的官方文档](https://docs.volta.sh/guide/getting-started)

如果你连安装 Volta 都没有管理员权限，可以参考这篇指南：

[无需管理员权限安装 Volta](https://stackoverflow.com/questions/78510512/use-multiple-node-versions-in-windows-simultaneously/78967945#78967945)

通常你需要重启终端或 VS Code，以刷新环境变量并正常使用 Volta。


## 使用 Volta 管理 Node.js 与 npm

本项目使用 **npm** 作为包管理工具。npm 随 Node.js 一并提供，因此只要通过 Volta 安装了正确的 Node.js 版本，就可以直接使用 `npm`。

相关文档：

- https://docs.volta.sh/guide/understanding

基本步骤：

#### 1. 安装项目要求的 Node.js 版本

如果项目的 `package.json` 已经固定了 Node.js 版本（通过 `engines` 或 Volta 配置），进入项目目录后运行任意 Node/npm 命令即可触发自动安装。也可以手动安装指定版本：

```bash
volta install node
```

#### 2. 使用 npm 安装依赖

```bash
npm install
```


## 检查已安装的 Node 和 npm 版本

```bash
volta list all
```

```bash
node -v
```

```bash
npm -v
```
