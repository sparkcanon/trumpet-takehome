# Trumpet - A simple widget app take home test

## Development

```bash
pnpm dev
```

## Build and run

- Build the app

  ```bash
  pnpm build
  ```

- Run the app
  ```bash
  pnpm preview
  ```

## Test

```bash
pnpm test:ui
```

## Docker

Build the docker image with:

```bash
docker build -t trumpet .
```

Run the docker image with:

```bash
docker run -p 3000:3000 trumpet
```

## Improvement ideas

- Investigate re-rendering issues
- Add accessibility features
- Error handling
- Better debouncing
- Avoid direct calls to the DB
