FROM node:20-alpine

WORKDIR /app

COPY mason_avenue_firearms/nextjs_space/ .

RUN npm ci && npx prisma generate && npx next build

EXPOSE 3000

CMD ["sh", "-c", "npx prisma migrate deploy && npx next start -p ${PORT:-3000}"]
