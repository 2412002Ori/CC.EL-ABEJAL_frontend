#!/bin/bash

echo "Iniciando integracion Frontend-Backend..."
echo

echo "Iniciando Backend en puerto 3003..."
cd "../CC.El_ABEJAL_BAKEND" && npm run dev &
BACKEND_PID=$!

echo "Esperando 3 segundos para que el backend inicie..."
sleep 3

echo "Iniciando Frontend en puerto 3000..."
cd "../CC. EL ABEJAL" && npm start &
FRONTEND_PID=$!

echo
echo "Ambos proyectos estan iniciando..."
echo "Backend: http://localhost:3003"
echo "Frontend: http://localhost:3000"
echo

# Función para limpiar procesos al salir
cleanup() {
    echo "Deteniendo procesos..."
    kill $BACKEND_PID 2>/dev/null
    kill $FRONTEND_PID 2>/dev/null
    exit
}

# Capturar señal de interrupción
trap cleanup SIGINT SIGTERM

# Mantener el script ejecutándose
wait 