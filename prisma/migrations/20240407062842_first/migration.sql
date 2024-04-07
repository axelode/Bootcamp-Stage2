-- CreateTable
CREATE TABLE "Tb_user" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "full_name" TEXT NOT NULL,

    CONSTRAINT "Tb_user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tb_wallet" (
    "id" SERIAL NOT NULL,
    "in_flow" INTEGER,
    "out_flow" INTEGER,
    "balance" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "Tb_wallet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tb_category" (
    "id" SERIAL NOT NULL,
    "category_name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "Tb_category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tb_transaction" (
    "id" SERIAL NOT NULL,
    "amount" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "category" TEXT NOT NULL,
    "note" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL,
    "category_name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Tb_transaction_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Tb_user_email_key" ON "Tb_user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Tb_wallet_user_id_key" ON "Tb_wallet"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Tb_category_category_name_key" ON "Tb_category"("category_name");

-- AddForeignKey
ALTER TABLE "Tb_wallet" ADD CONSTRAINT "Tb_wallet_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Tb_user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tb_category" ADD CONSTRAINT "Tb_category_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Tb_user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tb_transaction" ADD CONSTRAINT "Tb_transaction_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Tb_user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tb_transaction" ADD CONSTRAINT "Tb_transaction_category_name_fkey" FOREIGN KEY ("category_name") REFERENCES "Tb_category"("category_name") ON DELETE RESTRICT ON UPDATE CASCADE;
