-- CreateEnum
CREATE TYPE "ProviderStatus" AS ENUM ('Connected', 'Disconnected');

-- CreateTable
CREATE TABLE "user" (
    "user_id" CHAR(21) NOT NULL,
    "password" TEXT,
    "full_name" TEXT,
    "last_name" TEXT,
    "first_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "profile_picture" TEXT,
    "phone" CHAR(13),
    "updated_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "provider" (
    "provider_id" CHAR(21) NOT NULL,
    "name" JSONB,
    "_raw" JSONB NOT NULL,
    "_json" JSONB NOT NULL,
    "emails" JSONB,
    "photos" JSONB,
    "username" TEXT,
    "provider" TEXT NOT NULL,
    "status" "ProviderStatus" NOT NULL DEFAULT 'Connected',
    "display_name" TEXT NOT NULL,
    "last_status_changed_at" TIMESTAMP(3),
    "user_id" CHAR(21) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "provider_pkey" PRIMARY KEY ("provider_id")
);

-- CreateTable
CREATE TABLE "user_session" (
    "session_id" CHAR(21) NOT NULL,
    "provider" TEXT NOT NULL,
    "code_expiration" TIMESTAMP(3),
    "code" CHAR(32),
    "refresh_token" TEXT NOT NULL,
    "user_id" CHAR(21) NOT NULL,
    "revoked" BOOLEAN DEFAULT false,
    "revoked_at" TIMESTAMP(3),
    "updated_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_session_pkey" PRIMARY KEY ("session_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE INDEX "provider_user_id_provider_id_idx" ON "provider"("user_id", "provider_id");

-- CreateIndex
CREATE UNIQUE INDEX "provider_user_id_provider_id_key" ON "provider"("user_id", "provider_id");

-- CreateIndex
CREATE UNIQUE INDEX "user_session_refresh_token_key" ON "user_session"("refresh_token");

-- CreateIndex
CREATE INDEX "user_session_user_id_session_id_idx" ON "user_session"("user_id", "session_id");

-- CreateIndex
CREATE INDEX "user_session_session_id_refresh_token_idx" ON "user_session"("session_id", "refresh_token");

-- CreateIndex
CREATE INDEX "user_session_user_id_refresh_token_idx" ON "user_session"("user_id", "refresh_token");

-- CreateIndex
CREATE UNIQUE INDEX "user_session_user_id_session_id_key" ON "user_session"("user_id", "session_id");

-- CreateIndex
CREATE UNIQUE INDEX "user_session_session_id_refresh_token_key" ON "user_session"("session_id", "refresh_token");

-- CreateIndex
CREATE UNIQUE INDEX "user_session_user_id_refresh_token_key" ON "user_session"("user_id", "refresh_token");

-- AddForeignKey
ALTER TABLE "provider" ADD CONSTRAINT "provider_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_session" ADD CONSTRAINT "user_session_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;
