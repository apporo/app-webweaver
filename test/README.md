# app-webweaver test/example

## Usage

### Run

```shell
export DEBUG=devebot*,app*
export LOGOLITE_DEBUGLOG_ENABLED=true
npm run build && node test/example
```

### Try

```curl
curl http://0.0.0.0:18080/example/1234567890
```

or with proxies information:

```shell
curl --request GET \
  --url http://localhost:18080/example/abc-xyz \
  --header 'x-forwarded-for: 192.168.5.12' \
  --header 'x-forwarded-host: www.example.com' \
  --header 'x-forwarded-proto: https'
```
