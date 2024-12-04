// Nombre de la base de datos y objeto de almacenamiento
const dbName = "UserDB";
const storeName = "users";

// Inicializar la base de datos
function initIndexedDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(dbName, 1);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(storeName)) {
        db.createObjectStore(storeName, { keyPath: "id", autoIncrement: true });
      }
    };

    request.onsuccess = (event) => {
      resolve(event.target.result);
    };

    request.onerror = (event) => {
      reject(event.target.error);
    };
  });
}

// Guardar usuario en IndexedDB
async function saveUser(user) {
  const db = await initIndexedDB();
  const transaction = db.transaction(storeName, "readwrite");
  const store = transaction.objectStore(storeName);
  store.add(user);

  return new Promise((resolve, reject) => {
    transaction.oncomplete = () => resolve();
    transaction.onerror = (event) => reject(event.target.error);
  });
}

// Obtener todos los usuarios
async function getAllUsers() {
  const db = await initIndexedDB();
  const transaction = db.transaction(storeName, "readonly");
  const store = transaction.objectStore(storeName);

  return new Promise((resolve, reject) => {
    const request = store.getAll();
    request.onsuccess = (event) => resolve(event.target.result);
    request.onerror = (event) => reject(event.target.error);
  });
}

// Manejo del formulario
document.getElementById("userForm").addEventListener("submit", async (event) => {
  event.preventDefault();

  const username = document.getElementById("username").value;
  const email = document.getElementById("email").value;

  const user = { username, email };

  try {
    await saveUser(user);
    alert("Usuario guardado exitosamente!");
    document.getElementById("userForm").reset();
    loadUsers();
  } catch (error) {
    console.error("Error al guardar el usuario:", error);
  }
});

// Cargar usuarios en la interfaz
async function loadUsers() {
  const userList = document.getElementById("userList");
  userList.innerHTML = "";

  try {
    const users = await getAllUsers();
    users.forEach((user) => {
      const li = document.createElement("li");
      li.textContent = `Nombre: ${user.username}, Correo: ${user.email}`;
      userList.appendChild(li);
    });
  } catch (error) {
    console.error("Error al cargar los usuarios:", error);
  }
}

// Cargar usuarios al inicio
loadUsers();
