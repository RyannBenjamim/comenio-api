import { Module } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { getStorage } from 'firebase-admin/storage';
import { FirebaseService } from './firebase.service';
import * as path from 'path';
import * as fs from 'fs';

@Module({
  providers: [
    {
      provide: 'FIREBASE',
      useFactory: () => {
        const serviceAccountPath = process.env.FIREBASE_SERVICE_ACCOUNT_PATH;
        const bucketName = process.env.FIREBASE_STORAGE_BUCKET;

        if (!serviceAccountPath) {
          throw new Error('FIREBASE_SERVICE_ACCOUNT_PATH não definido');
        }

        if (!bucketName) {
          throw new Error('FIREBASE_STORAGE_BUCKET não definido');
        }

        const resolvedPath = path.resolve(serviceAccountPath);

        if (!fs.existsSync(resolvedPath)) {
          throw new Error(`Arquivo Firebase não encontrado em: ${resolvedPath}`);
        }

        if (!admin.apps.length) {
          admin.initializeApp({
            credential: admin.credential.cert(require(resolvedPath)),
          });
        }

        return getStorage().bucket(bucketName);
      },
    },
    FirebaseService,
  ],
  exports: ['FIREBASE', FirebaseService],
})
export class FirebaseModule {}

