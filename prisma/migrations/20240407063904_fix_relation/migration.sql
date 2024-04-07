/*
  Warnings:

  - You are about to drop the column `category_name` on the `Tb_transaction` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Tb_transaction" DROP CONSTRAINT "Tb_transaction_category_name_fkey";

-- AlterTable
ALTER TABLE "Tb_transaction" DROP COLUMN "category_name";

-- AddForeignKey
ALTER TABLE "Tb_transaction" ADD CONSTRAINT "Tb_transaction_category_fkey" FOREIGN KEY ("category") REFERENCES "Tb_category"("category_name") ON DELETE RESTRICT ON UPDATE CASCADE;
