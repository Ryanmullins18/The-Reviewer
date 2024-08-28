-- DropForeignKey
ALTER TABLE "comments" DROP CONSTRAINT "comments_review_id_fkey";

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_review_id_fkey" FOREIGN KEY ("review_id") REFERENCES "reviews"("id") ON DELETE CASCADE ON UPDATE CASCADE;
