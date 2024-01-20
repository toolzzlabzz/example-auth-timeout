generate prisma profile
```
npx prisma generate --schema prisma/mongodb/schema.prisma
npx prisma generate --schema prisma/postgresql/schema.prisma
```

Import:
```
import { PrismaClient as PrismaMongo} from '@prisma-mongodb/client'
import { PrismaClient as PrismaPostgresql} from '@prisma-postgresql/client'

export const db1 = new PrismaMongo()
export const db2 = new PrismaPostgresql()
```

Migrate
```
npx prisma migrate dev --schema prisma/postgresql/schema.prisma --name initial
```
