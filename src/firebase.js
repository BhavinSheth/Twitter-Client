import { initializeApp } from 'firebase/app'
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite'
const firebaseConfig = {
  apiKey: 'AIzaSyA4DWCdQ_RpVDmgcK73bjCOdF5-lSSf0BI',
  authDomain: 'twitter-clone-90991.firebaseapp.com',
  projectId: 'twitter-clone-90991',
  storageBucket: 'twitter-clone-90991.appspot.com',
  messagingSenderId: '498854556742',
  appId: '1:498854556742:web:94dc0a25237ec99cf54647',
  measurementId: 'G-4SPK6E3BTF',
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
export default db
