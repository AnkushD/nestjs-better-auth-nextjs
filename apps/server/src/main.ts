import { NestFactory } from '@nestjs/core';
// modules
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 8000);
}
bootstrap().catch((err) => {
  console.error('Error during bootstrap:', err);
});
