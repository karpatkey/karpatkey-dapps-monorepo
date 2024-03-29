# Karpatkey dapps monorepo

This repository contains the source code for the karpatkey dapps.

[![Linter](https://github.com/KarpatkeyDAO/karpatkey-dapps-monorepo/workflows/linter/badge.svg)](https://github.com/KarpatkeyDAO/karpatkey-dapps-monorepo/actions?query=workflow%3Alinter)
[![Styled With Prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://prettier.io/)
![Next JS](https://img.shields.io/badge/Next%20JS-13.3.4-blue)
![Typescript](https://img.shields.io/badge/Typescript-5.0.4-blue)


### This repository is a work in progress, please be patient, we still have a lot to do.

## Getting Started

TODO: Complete

## Project Links
- 📰 [Kanban Board](https://github.com/orgs/KarpatkeyDAO/projects/1)

## How to use
TODO: Complete

## Docker

Follow below commands to get the app up and running in docker container

```bash
docker build -t dharmendrakariya/reports:test .
```

```bash
docker run -p 3000:3000 dharmendrakariya/reports:test
```

- App will be up and running on http://localhost:3000/

## Docker reports dev
Follow below commands to get the app up and running in docker container, before add the proper
args configuration to the command.

Build the image
```bash
docker build -f Dockerfile.reports.dev -t reports:dev --build-arg REACT_DATA_WAREHOUSE_ENV=...
```

Execute the image
```bash
docker run -dp 127.0.0.1:3000:3000 reports:dev
```

Check that everything is working fine
```bash
docker exec -it CONTAINER_ID /bin/sh
```


## Roadmap
- Create report dApp. *In progress*
- Integrate new design. *In progress*
- Create revoker dApp.
- Create panic button dApp.

## Contribution
Any and every contribution is welcomed and appreciated.

## Sections of the app and their data dependencies

Check out the readme [Data documentation](https://github.com/KarpatkeyDAO/karpatkey-dapps-monorepo/tree/main/dapps/reports/DATA.md) for more details.
