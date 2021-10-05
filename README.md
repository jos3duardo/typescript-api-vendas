## API de Gestão de Vendas
[![wakatime](https://wakatime.com/badge/user/7e68e438-f1f7-4933-b9b7-f42aeb5c2a1b.svg)](https://wakatime.com/@7e68e438-f1f7-4933-b9b7-f42aeb5c2a1b)

## Funcionalidades

Cadastro de:
 - Produtos
 - Clientes
 - Pedidos de Compra
 - Gestão de Usuarios:
    - Autenticação via token JWT
    - Recuperação de senha por email
    - atualização de perfil
    - atualização de avatar


subindo container com banco de dados postgres
```bash
https://web.whatsapp.com/
```
container do servidor redis
```bash
docker run --name redis -p 6379:6379 -d -t redis:alpine
```

Usando RedisInsight  como cliente redis  
container do cliente redis
```bash
docker run --name redis-client -v redisinsight:/db -p 8001:8001 -d -t redislabs/redisinsight:latest
```

depois de rodar esse comando o cliente redis fica disponivel nesta rota  
[http://localhost:8001](http://localhost:8001/)

Generating a UUID in Postgres for Insert statement
```bash
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
```

criando uma migration
```bash
yarn typeorm migration:create -n CreateProducts
```

Rodando a migration
```bash
yarn typeorm migration:run
```
