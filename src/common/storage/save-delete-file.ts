import { FirebaseService } from '../firebase/firebase.service';

export const safeDeleteFile = async (
  firebase: FirebaseService,
  filePath: string,
  retries = 1,
) => {
  for (let i = 0; i < retries; i++) {
    try {
      await firebase.deleteFile(filePath);
      return;
    } catch (error) {
      if (i === retries - 1) {
        console.error('Falha ao remover arquivo órfão', {
          filePath,
          error,
        });
      }
    }
  }
};
