# FFGBSY App

## Backup Environment

- Speziell für den Zugriff ohne https direkt über die IP 192.168.0.121.
- URL: `http://192.168.0.121/app`

Build Backup Version:

```ps1
ng build --configuration=backup --base-href=/app/ --output-path=dist-backup
```

## Production Build

```ps1
ng build --configuration=production --output-path=dist
```
