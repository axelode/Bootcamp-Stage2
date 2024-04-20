-- CreateTable
CREATE TABLE "Tb_pending_transaction" (
    "id" SERIAL NOT NULL,
    "amount" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "category" TEXT NOT NULL,
    "note" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Tb_pending_transaction_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Tb_pending_transaction" ADD CONSTRAINT "Tb_pending_transaction_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Tb_user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tb_pending_transaction" ADD CONSTRAINT "Tb_pending_transaction_category_fkey" FOREIGN KEY ("category") REFERENCES "Tb_category"("category_name") ON DELETE RESTRICT ON UPDATE CASCADE;
