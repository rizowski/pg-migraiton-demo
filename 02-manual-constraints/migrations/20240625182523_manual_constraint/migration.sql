-- CreateTable
CREATE TABLE "app_access" (
    "id" TEXT NOT NULL,
    "user_id" TEXT,
    "group_id" TEXT,
    "app" TEXT NOT NULL,
    "tools" TEXT[],
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "app_access_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "app_access_user_id_idx" ON "app_access"("user_id");

-- CreateIndex
CREATE INDEX "app_access_group_id_idx" ON "app_access"("group_id");

-- CreateIndex
CREATE UNIQUE INDEX "app_access_group_id_app_key" ON "app_access"("group_id", "app");

-- CreateIndex
CREATE UNIQUE INDEX "app_access_user_id_app_key" ON "app_access"("user_id", "app");

-- AddForeignKey
ALTER TABLE "app_access" ADD CONSTRAINT "app_access_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "app_access" ADD CONSTRAINT "app_access_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "groups"("id") ON DELETE CASCADE ON UPDATE CASCADE;

