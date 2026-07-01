## 安裝 Volta

使用 Volta 安裝 Node.js 並在不同版本之間切換，不需要管理員權限。

不過，安裝 Volta 本身時，如果擁有管理員權限會更方便。

[安裝 Volta 的官方文件](https://docs.volta.sh/guide/getting-started)

如果你連安裝 Volta 都沒有管理員權限，可以參考這篇指南：

[無需管理員權限安裝 Volta](https://stackoverflow.com/questions/78510512/use-multiple-node-versions-in-windows-simultaneously/78967945#78967945)

通常你需要重新啟動終端或 VS Code，以重新整理環境變數並正常使用 Volta。


## 使用 Volta 安裝 pnpm

相關文件：

- https://docs.volta.sh/advanced/pnpm
- https://pnpm.io/installation#using-volta

基本步驟：

#### 1. 啟用 Volta 對 pnpm 的實驗性支援

- **Windows**：在系統環境變數中添加 `VOLTA_FEATURE_PNPM`，值設為 `1`。

- **macOS / Linux**：在 shell 設定檔中添加（如 `~/.zshrc`、`~/.bash_profile`）：
  ```bash
  export VOLTA_FEATURE_PNPM=1
  ```
  然後重新開啟終端或執行 `source ~/.zshrc` 生效。


#### 2. 執行 `volta install pnpm`。（如果專案的 `package.json` 已經固定了 pnpm 版本，則這一步不是必須的；直接執行 `pnpm` 指令即可觸發自動安裝）



## 檢查已安裝的 Node 和 pnpm 版本

```bash
volta list all
```

```bash
node -v
```

```bash
pnpm -v
```
