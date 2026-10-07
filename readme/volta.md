## Install Volta

Using Volta to install Node.js and switch between their versions doesn't require admin rights.

But for installing Volta, having admin right is more convenient.

[Official Volta installation guide](https://docs.volta.sh/guide/getting-started)

Still, if you don't have admin right to even install Volta, you may follow this guide:

[Install Volta without admin rights](https://stackoverflow.com/questions/78510512/use-multiple-node-versions-in-windows-simultaneously/78967945#78967945)

Usually you need to restart your shell or VS Code to refresh the environment variables and use Volta.


## Node.js and npm with Volta

This project uses **npm** as the package manager. npm is bundled with Node.js, so once Volta installs the correct Node.js version, you can use `npm` directly.

Related documentation:

- https://docs.volta.sh/guide/understanding

Basic steps:

#### 1. Install the Node.js version required by the project

If the project's `package.json` already pins the Node.js version (via `engines` or Volta config), enter the project directory and run any Node/npm command to trigger automatic installation. You can also install a specific version manually:

```bash
volta install node
```

#### 2. Use npm to install dependencies

```bash
npm install
```


## Check installed Node and npm versions

```bash
volta list all
```

```bash
node -v
```

```bash
npm -v
```
