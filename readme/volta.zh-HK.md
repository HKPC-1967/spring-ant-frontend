## 安裝 Volta

使用 Volta 安裝 Node.js 並在不同版本之間切換，不需要管理員權限。

不過，安裝 Volta 本身時，如果擁有管理員權限會更方便。

[安裝 Volta 的官方文件](https://docs.volta.sh/guide/getting-started)

如果你連安裝 Volta 都沒有管理員權限，可以參考這篇指南：

[無需管理員權限安裝 Volta](https://stackoverflow.com/questions/78510512/use-multiple-node-versions-in-windows-simultaneously/78967945#78967945)

通常你需要重新啟動終端或 VS Code，以重新整理環境變數並正常使用 Volta。


## 使用 Volta 管理 Node.js 與 npm

本專案使用 **npm** 作為套件管理工具。npm 隨 Node.js 一併提供，因此只要透過 Volta 安裝了正確的 Node.js 版本，就可以直接使用 `npm`。

相關文件：

- https://docs.volta.sh/guide/understanding

基本步驟：

#### 1. 安裝專案要求的 Node.js 版本

如果專案的 `package.json` 已經固定了 Node.js 版本（透過 `engines` 或 Volta 設定），進入專案目錄後執行任意 Node/npm 指令即可觸發自動安裝。也可以手動安裝指定版本：

```bash
volta install node
```

#### 2. 使用 npm 安裝依賴

```bash
npm install
```


## 檢查已安裝的 Node 和 npm 版本

```bash
volta list all
```

```bash
node -v
```

```bash
npm -v
```
