import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const loggedGuard: CanActivateFn = (route, state) => {
  const token = localStorage.getItem('access_token');
  const router = inject(Router); // ✅ Inyección correcta del Router

  if (token) {
    return true; // 🔥 Permite el acceso si hay token
  } else {
    router.navigate(['']); // 🔥 Redirige al usuario si no está autenticado
    return false;
  }
};
