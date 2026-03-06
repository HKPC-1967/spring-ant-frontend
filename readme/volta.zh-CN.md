## 安装 Volta

使用 Volta 安装 Node.js 并在不同版本之间切换，不需要管理员权限。

不过，安装 Volta 本身时，如果拥有管理员权限会更方便。

[安装 Volta](https://docs.volta.sh/guide/getting-started)

如果你连安装 Volta 都没有管理员权限，可以参考这篇指南：

[无需管理员权限安装 Volta](https://stackoverflow.com/questions/78510512/use-multiple-node-versions-in-windows-simultaneously/78967945#78967945)

通常你需要重启终端或 VS Code，以刷新环境变量并正常使用 Volta。

## Volta 使用指南

官方指南：https://docs.volta.sh/guide/

### 我还需要手动安装 Node 吗？

如果 `package.json` 中已经有下面这段配置（也就是已经有人固定好了版本）：

```json
{
  "volta": {
    "node": "22.11.0"
  }
}
```

那么你就不需要手动安装了。  
只要运行 `node` 命令，Volta 就会自动帮你下载正确的版本。

#### 在 package.json 中固定 Node 版本（如果还没做）

`volta pin node@22.11.0`

### 使用 Volta 安装 pnpm

相关文档：

- https://docs.volta.sh/advanced/pnpm
- https://pnpm.io/installation#using-volta

基本步骤：

1. 在环境变量中设置 `VOLTA_FEATURE_PNPM=1`
2. 运行 `volta install pnpm`。（如果项目的 `package.json` 已经固定了 pnpm 版本，则这一步不是必须的；直接运行 `pnpm` 命令即可触发自动安装）

#### 在 package.json 中固定 pnpm 版本（如果还没做）

`volta pin pnpm@9.14.4`

### 检查已安装的 Node 和 pnpm 版本

`volta list all`
