-- CreateTable
CREATE TABLE "TheLegacyTableNoOneWantsToOwn" (
    "theLegacyTableItemId" SERIAL NOT NULL,
    "entry" VARCHAR(255) NOT NULL,
    "data" VARCHAR(255) NOT NULL,
    "Values" VARCHAR(255) NOT NULL,
    "DEAD_USE_WHEN_HOPE_IS_LOST_detail" VARCHAR(255) NOT NULL,
    "info" VARCHAR(255) NOT NULL,
    "date" VARCHAR(255) NOT NULL,

    CONSTRAINT "TheLegacyTableNoOneWantsToOwn_pkey" PRIMARY KEY ("theLegacyTableItemId")
);
