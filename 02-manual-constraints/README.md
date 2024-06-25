# 02-additions

Add constraint on one or other

```sql
-- CreateConstraint
ALTER TABLE "app_access" ADD CONSTRAINT check_user_group_not_null CHECK (("user_id" IS NOT NULL AND "group_id" IS NULL) OR ("user_id" IS NULL AND "group_id" IS NOT NULL));
```
