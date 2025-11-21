
// ARQUIVO DE CONFIGURAÇÃO DO FIREBASE
// -----------------------------------
// No momento, os imports estão comentados para evitar lentidão no carregamento
// enquanto usamos o modo de demonstração (Mocks).

// import firebase from "firebase/compat/app";
// import "firebase/compat/auth";
// import "firebase/compat/firestore";
// import "firebase/compat/storage";
// import "firebase/compat/analytics";

// CONFIGURAÇÃO (LIMPA TEMPORARIAMENTE)
const firebaseConfig = {
  // Cole suas chaves aqui futuramente
};

// Inicialização (Desativada)
let app = null;
let auth = null;
let db = null;
let storage = null;
let analytics = null;

/*
try {
  if (firebaseConfig.apiKey && typeof window !== 'undefined') {
     // Lógica de inicialização futura
  }
} catch (error) {
  console.error("Erro Firebase:", error);
}
*/

export { auth, db, storage };
export default app;
