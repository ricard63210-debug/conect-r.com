# Reglas del Proyecto (conect-r.com)

## Carpeta de Trabajo Exclusiva y Repo de Producción

1. **Carpeta de Trabajo:** SIEMPRE debes trabajar directamente en la carpeta del monorepo de producción `/Users/ricardoorozco/conect-r.com`, dentro del subdirectorio `artifacts/conectr-dashboard/`. 
2. **Repositorio Standalone Deprecado:** NUNCA edites, comites, ni hagas push a la carpeta standalone `/Users/ricardoorozco/conectr-dashboard` ni a su repositorio remoto `conectr-dashboard.git` — ese repositorio está deprecado y no se usa en producción.
3. **Confirmación Pre-Commit/Pre-Push:** Antes de hacer cualquier commit o push, debes confirmar explícitamente:
   - La ruta completa de la carpeta donde estás parado (`pwd`)
   - El resultado de `git remote -v`
   - Que el remoto sea `conect-r.com.git`. Si no lo es, **DETENTE** y pregunta al usuario antes de continuar.
4. **Clarificación:** Si en algún momento no estás seguro de en qué carpeta estás trabajando, pregunta antes de hacer cualquier cambio.
