import { bootstrap } from '@angular/platform-browser-dynamic';
import { disableDeprecatedForms, provideForms } from '@angular/forms';

// Our main component
import { AppComponent } from './app.component';

// Our main routes
import { APP_ROUTER_PROVIDERS } from './app.routes';

// Firebase
import { FIREBASE_PROVIDERS, defaultFirebase } from 'angularfire2';

bootstrap(AppComponent, [
  APP_ROUTER_PROVIDERS,
  disableDeprecatedForms(),
  provideForms(),
  FIREBASE_PROVIDERS,
  // Initialize Firebase app  
  defaultFirebase({
    apiKey: "AIzaSyDHyFDuc3lgCghTWqlvyET8A1mP_co4qes",
    authDomain: "moviehunter-14222.firebaseapp.com",
    databaseURL: "https://moviehunter-14222.firebaseio.com",
    storageBucket: "moviehunter-14222.appspot.com"
  })
])
.catch(err => console.error(err));
