import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideFirebaseApp,initializeApp } from '@angular/fire/app'
import { provideStorage,getStorage } from '@angular/fire/storage'
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),
    importProvidersFrom([
      provideFirebaseApp (() => 
        initializeApp({
          apiKey: "AIzaSyC9U9kMuWAm9iMipn2pVV0zSDuV8J3YZpA",
          authDomain: "generador-qr-c7cd2.firebaseapp.com",
          projectId: "generador-qr-c7cd2",
          storageBucket: "gs://generador-qr-c7cd2.appspot.com",
          messagingSenderId: "1068171592526",
          appId: "1:1068171592526:web:2c78de167754e70702941f"
        })
      ),
      provideStorage (() => getStorage())
    ])
  ]
};
