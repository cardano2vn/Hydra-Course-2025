FROM oven/bun:latest
WORKDIR /app
COPY package.json bun.lockb ./
RUN bun install  
COPY . .
RUN bunx prisma generate
RUN bun run build
ENV PORT=3000
EXPOSE 3000
CMD ["bun", "run", "start"]
