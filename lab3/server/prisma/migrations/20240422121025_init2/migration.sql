-- CreateTable
CREATE TABLE "VideoTranscodingTask" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "status" TEXT NOT NULL DEFAULT 'pending'
);
