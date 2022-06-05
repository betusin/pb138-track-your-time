import * as fs from 'fs';
import { createOpenApiDocument } from './app-common';
import { NestFactory } from '@nestjs/core';
import { RestModule } from './rest.module';

async function main() {
  if (process.argv.length != 3) {
    process.stderr.write('One argument expected');
    process.exit(1);
  }
  const dstFileName = process.argv[2];
  const app = await NestFactory.create(RestModule);
  const document = createOpenApiDocument(app);
  fs.writeFileSync(dstFileName, JSON.stringify(document));
}

main();
