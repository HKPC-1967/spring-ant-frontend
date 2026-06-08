## Draft (You can ignore this part, it's just for record and reference)

### Check code style

```bash
pnpm run lint
```

You can also use script to auto fix some lint error:

```bash
pnpm run lint:fix
```

### Test code

```bash
pnpm test
```

### Docker commands

- host port 8000 to container port 80

```bash
docker run -itdp 8000:80 --restart=unless-stopped --log-driver json-file --log-opt max-size=10m --log-opt max-file=3 --name spring_ant_frontend spring_ant_frontend
```

- `--progress=plain --no-cache` is used for detailed logging without cache

```bash
docker build -t spring_ant_frontend . --progress=plain --no-cache
```
