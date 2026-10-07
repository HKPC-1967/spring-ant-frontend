## 安装 Volta

使用 Volta 安装 Node.js 并在不同版本之间切换，不需要管理员权限。

不过，安装 Volta 本身时，如果拥有管理员权限会更方便。

[安装 Volta 的官方文档](https://docs.volta.sh/guide/getting-started)

如果你连安装 Volta 都没有管理员权限，可以参考这篇指南：

[无需管理员权限安装 Volta](https://stackoverflow.com/questions/78510512/use-multiple-node-versions-in-windows-simultaneously/78967945#78967945)

通常你需要重启终端或 VS Code，以刷新环境变量并正常使用 Volta。


## 使用 Volta 安装 pnpm

相关文档：

- https://docs.volta.sh/advanced/pnpm
- https://pnpm.io/installation#using-volta

基本步骤：

#### 1. 启用 Volta 对 pnpm 的实验性支持

- **Windows**：在系统环境变量中添加 `VOLTA_FEATURE_PNPM`，值设为 `1`。

- **macOS / Linux**：在 shell 配置文件中添加（如 `~/.zshrc`、`~/.bash_profile`）：
  ```bash
  export VOLTA_FEATURE_PNPM=1
  ```
  然后重新打开终端或执行 `source ~/.zshrc` 生效。


#### 2. 运行 `volta install pnpm`。（如果项目的 `package.json` 已经固定了 pnpm 版本，则这一步不是必须的；直接运行 `pnpm` 命令即可触发自动安装）



## 检查已安装的 Node 和 pnpm 版本

```bash
volta list all
```

```bash
node -v
```

```bash
pnpm -v
```
