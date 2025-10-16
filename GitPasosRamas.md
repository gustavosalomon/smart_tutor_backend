# 🚀 Flujo de Trabajo Colaborativo en GitHub con Visual Studio

Este documento detalla el procedimiento recomendado para que 3 (o más) usuarios trabajen de forma independiente en un proyecto alojado en GitHub, integrando sus cambios de manera segura.

## 👥 Miembros del Equipo

| Rol | Nombre/Usuario de Ejemplo |
| :--- | :--- |
| Administrador/Líder | **Usuario A (Main)** |
| Colaborador 2 | **Usuario B** |
| Colaborador 3 | **Usuario C** |

## 🛠️ Herramientas Necesarias

* **Repositorio** del proyecto en **GitHub**.
* **Visual Studio** o **Visual Studio Code** (con la extensión Git/GitHub integrada).
* **Git** instalado y configurado en cada máquina.

---

## 🏗️ Flujo de Trabajo Principal: Ramas y Pull Requests

El objetivo es que cada colaborador trabaje en una **rama** separada para una característica o corrección de error específica. Luego, esos cambios se fusionan en la rama principal (`main` o `master`) solo después de una revisión.

### 1. **Configuración Inicial (Una sola vez)**

1.  **Clonar el Repositorio:** Todos los usuarios deben clonar el repositorio central de GitHub a sus máquinas locales.
    ```bash
    git clone [https://aws.amazon.com/es/what-is/repo/](https://aws.amazon.com/es/what-is/repo/)
    ```
2.  **Abrir en Visual Studio:** Abrir el proyecto clonado en Visual Studio (VS) o VS Code.

### 2. **Comenzar una Nueva Tarea**

**Este ciclo debe repetirse para cada tarea o funcionalidad.**

1.  **Actualizar la Rama Principal:** Asegúrate de que tu copia local de `main` esté al día con GitHub.
    ```bash
    git checkout main
    git pull origin main
    ```

2.  **Crear una Nueva Rama:** Crea una nueva rama local para tu tarea. **Este es el paso clave para aislar tu trabajo.**
    * **Regla:** Usa nombres descriptivos (ej: `feature/login`, `bugfix/css-header`).
    ```bash
    # Ejemplo:
    git checkout -b feature/mi-tarea-unica
    ```
    *(En VS/VS Code, usa la interfaz de Git para crear y cambiar a una nueva rama.)*

### 3. **Realizar y Guardar Cambios (Localmente)**

1.  **Programar:** Realiza tus cambios en el código.
2.  **Guardar (Commit):** Cuando la tarea esté lista o haya un punto de guardado lógico, haz *stage* de los archivos y realiza el *commit*.
    ```bash
    git add .
    git commit -m "feat: Descripción clara de lo que se implementó/arregló."
    ```
    *(En VS/VS Code, usa el panel de **Cambios de Git** para hacer el Commit.)*

### 4. **Compartir los Cambios (Remotamente)**

1.  **Subir la Rama:** Sube tu nueva rama (y todos tus commits) al repositorio de GitHub.
    ```bash
    git push origin feature/mi-tarea-unica
    ```
    *(En VS/VS Code, presiona **Push**.)*

### 5. **Visualización y Revisión de Cambios (Pull Request)**

Aquí es donde el equipo visualiza y valida los cambios de cada integrante.

1.  **Crear un Pull Request (PR):**
    * Ve a GitHub.
    * Crea un **Pull Request** (Solicitud de Fusión) que vaya de tu rama **origen** (`feature/mi-tarea-unica`) a la rama **destino** (`main`).

2.  **Revisión y Visualización:**
    * El Administrador (A) y otros colaboradores revisan el PR.
    * La pestaña **"Files changed"** (Archivos Cambiados) en GitHub muestra **exactamente línea por línea** el código que cambiaste (el *diff*).
    * Los revisores dejan comentarios y solicitan ajustes si es necesario.

3.  **Fusión (Merge):**
    * Una vez que el código ha sido aprobado, se **fusiona (Merge)** el Pull Request a la rama `main`.

---

## 📝 Resumen: ¿Cómo visualizar los cambios?

La clave para la visualización y el trabajo separado es **GitHub** actuando como el centro de revisión.

| Aspecto a Visualizar | Método Recomendado |
| :--- | :--- |
| **Cambios de un usuario específico** | Revisar los **Pull Requests (PRs)** creados por ese usuario. |
| **Código modificado (línea a línea)** | Pestaña **"Files changed"** dentro del PR en GitHub (muestra el *diff*). |
| **Historial completo en `main`** | Pestaña **"Commits"** en GitHub para la rama `main`, mostrando quién fusionó (y en qué PR). |
| **Separación del trabajo** | El uso de **Ramas** (`feature/`, `bugfix/`) asegura que nadie rompa `main` mientras trabaja. |

### 💡 Después de la Fusión

Después de que tu rama se fusione con éxito en `main`:

* **Limpia:** Elimina tu rama remota y local (si ya no la necesitas).
* **Sincroniza:** Antes de empezar la siguiente tarea, **siempre** repite el **Paso 2.1** para asegurarte de que tienes los cambios que otros compañeros acaban de fusionar.