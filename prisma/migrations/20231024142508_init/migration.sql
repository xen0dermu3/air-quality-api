-- CreateTable
CREATE TABLE "iqair_logs" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "coordinates" JSONB,
    "data" JSONB,

    CONSTRAINT "iqair_logs_pkey" PRIMARY KEY ("id")
);
