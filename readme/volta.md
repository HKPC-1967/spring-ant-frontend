## Install Volta

Using Volta to install Node.js and switch between their versions doesn't require admin rights.

But for installing Volta, having admin right is more convenient.

[Install Volta](https://docs.volta.sh/guide/getting-started)

Still, if you don't have admin right to even install Volta, you may follow this guide:

[Install Volta without admin rights](https://stackoverflow.com/questions/78510512/use-multiple-node-versions-in-windows-simultaneously/78967945#78967945)

Usually you need to restart your shell or VS Code to refresh the environment variables and use Volta.

## Volta Guide

Official guide: https://docs.volta.sh/guide/

### Do I need to install Node?

If the package.json has this config already (someone else has pinned the version already):

```json
  "volta": {
    "node": "22.11.0"
  }
```

then you don't need to install it manually.  
Simply running `node` command and Volta will automatically download the correct version for you.

#### Pin Node version in package.json (if not done already)

`volta pin node@22.11.0`

### Installing pnpm with Volta

Documentations:

- https://docs.volta.sh/advanced/pnpm
- https://pnpm.io/installation#using-volta

Basic steps:

1. In your environment variables, set VOLTA_FEATURE_PNPM=1
2. Run `volta install pnpm`. (If the project's package.json has a pinned pnpm version, then this step is not necessary; just run the `pnpm` command to trigger auto installation)

#### Pin pnpm version in package.json (if not done already)

`volta pin pnpm@9.14.4`

### Check installed versions of Node and pnpm:

`volta list all`
