## Install Volta

Using Volta to install Node.js and switch between their versions doesn't require admin rights.

But for installing Volta, having admin right is more convenient.

[Official Volta installation guide](https://docs.volta.sh/guide/getting-started)

Still, if you don't have admin right to even install Volta, you may follow this guide:

[Install Volta without admin rights](https://stackoverflow.com/questions/78510512/use-multiple-node-versions-in-windows-simultaneously/78967945#78967945)

Usually you need to restart your shell or VS Code to refresh the environment variables and use Volta.


## Installing pnpm with Volta

Related documentation:

- https://docs.volta.sh/advanced/pnpm
- https://pnpm.io/installation#using-volta

Basic steps:

#### 1. Enable Volta's experimental support for pnpm

- **Windows**: Add `VOLTA_FEATURE_PNPM` to system environment variables with value `1`.

- **macOS / Linux**: Add to your shell config file (e.g. `~/.zshrc`, `~/.bash_profile`):
  ```bash
  export VOLTA_FEATURE_PNPM=1
  ```
  Then reopen the terminal or run `source ~/.zshrc` to apply.


#### 2. Run `volta install pnpm`. (If the project's `package.json` already pins the pnpm version, this step is not required; just run the `pnpm` command to trigger automatic installation)



## Check installed Node and pnpm versions

```bash
volta list all
```

```bash
node -v
```

```bash
pnpm -v
```
