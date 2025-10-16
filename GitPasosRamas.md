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

Hacer cambios y guardarlos en Git

git add .
git commit -m "Descripción clara de los cambios"
git push origin nombre-de-tu-rama

### 6. Crear un Pull Request (PR) en GitHub

Ve al repositorio en GitHub.

Haz clic en "Compare & pull request".

Asegúrate de que la PR va de tu rama → main.

Escribe un mensaje y desipción del cambio.

Envía la PR y espera revisión del equipo.

Una vez revisada, haz clic en "Merge pull request".

## 7.