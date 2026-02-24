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
        const configRaw = process.env.FIREBASE_SERVICE_ACCOUNT_PATH;
        const bucketName = process.env.FIREBASE_STORAGE_BUCKET;

        if (!configRaw) {
          throw new Error('FIREBASE_SERVICE_ACCOUNT_PATH não definido');
        }

        if (!bucketName) {
          throw new Error('FIREBASE_STORAGE_BUCKET não definido');
        }

        let serviceAccount: any;

        if (configRaw.trim().startsWith('{')) {
          try {
            serviceAccount = JSON.parse(configRaw);
            serviceAccount.private_key = serviceAccount.private_key.replace(/\\n/g, '\n');
          } catch (e) {
            throw new Error('Erro ao fazer parse do JSON do Firebase em FIREBASE_SERVICE_ACCOUNT_PATH');
          }
        } else {
          const resolvedPath = path.resolve(configRaw);
          if (!fs.existsSync(resolvedPath)) {
            throw new Error(`Arquivo Firebase não encontrado em: ${resolvedPath}`);
          }
          serviceAccount = require(resolvedPath);
        }

        if (!admin.apps.length) {
          admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
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
