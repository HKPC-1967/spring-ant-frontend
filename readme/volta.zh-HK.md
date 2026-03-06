## 安裝 Volta

使用 Volta 安裝 Node.js 並在不同版本之間切換，不需要管理員權限。

不過，安裝 Volta 本身時，如果擁有管理員權限會更方便。

[安裝 Volta](https://docs.volta.sh/guide/getting-started)

如果你連安裝 Volta 都沒有管理員權限，可以參考這篇指南：

[無需管理員權限安裝 Volta](https://stackoverflow.com/questions/78510512/use-multiple-node-versions-in-windows-simultaneously/78967945#78967945)

通常你需要重新啟動終端或 VS Code，以重新整理環境變數並正常使用 Volta。

## Volta 使用指南

官方指南：https://docs.volta.sh/guide/

### 我還需要手動安裝 Node 嗎？

如果 `package.json` 中已經有下面這段設定（也就是已經有人固定好版本）：

```json
{
  "volta": {
    "node": "22.11.0"
  }
}
```

那麼你就不需要手動安裝了。  
只要執行 `node` 指令，Volta 就會自動幫你下載正確的版本。

#### 在 package.json 中固定 Node 版本（如果還沒做）

`volta pin node@22.11.0`

### 使用 Volta 安裝 pnpm

相關文件：

- https://docs.volta.sh/advanced/pnpm
- https://pnpm.io/installation#using-volta

基本步驟：

1. 在環境變數中設定 `VOLTA_FEATURE_PNPM=1`
2. 執行 `volta install pnpm`。（如果專案的 `package.json` 已經固定了 pnpm 版本，則這一步不是必須的；直接執行 `pnpm` 指令即可觸發自動安裝）

#### 在 package.json 中固定 pnpm 版本（如果還沒做）

`volta pin pnpm@9.14.4`

### 檢查已安裝的 Node 和 pnpm 版本

`volta list all`
