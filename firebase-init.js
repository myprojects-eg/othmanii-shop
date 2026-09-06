// إعدادات مشروع Firebase الخاص بمتجر عُثماني
const firebaseConfig = {
  apiKey: "AIzaSyBt4SbPM0EJDK5ynSp4QFHRLZxfrOedE0c",
  authDomain: "othmanii-store.firebaseapp.com",
  projectId: "othmanii-store",
  storageBucket: "othmanii-store.firebasestorage.app",
  messagingSenderId: "743126014928",
  appId: "1:743126014928:web:652459c059ed75fd9bf7d5",
  measurementId: "G-R7HHCCVBY0"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// خلي صاحب المحل فاضل مسجل دخول حتى لو قفل المتصفح
auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL);

// ===== رفع الصور على ImgBB (مجاني، بدون حاجة لبطاقة بنكية) =====
const IMGBB_API_KEY = '483b73eb19d76305e46b0df15b29428b';

async function uploadImageToImgbb(file){
  const formData = new FormData();
  formData.append('image', file);
  const res = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
    method: 'POST',
    body: formData
  });
  const data = await res.json();
  if(data && data.success && data.data && data.data.url){
    return data.data.url;
  }
  throw new Error('فشل رفع الصورة على ImgBB');
}
