-- Add unique constraint to Company domain field
CREATE UNIQUE INDEX "Company_domain_key" ON "Company"("domain");