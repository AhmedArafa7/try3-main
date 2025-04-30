import { Routes } from '@angular/router';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { AuthlayoutComponent } from './layouts/authlayout/authlayout.component';
import { BlanklayoutComponent } from './layouts/blanklayout/blanklayout.component';
//import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { 
        path: '', 
        component: AuthlayoutComponent, 
        children: [
            { path: 'login', loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent) },
            { path: 'register', loadComponent: () => import('./pages/register/register.component').then(m => m.RegisterComponent) },
            { path: 'forget-password', loadComponent: () => import('./pages/forget-password/forget-password.component').then(m => m.ForgetPasswordComponent) }
        ]
    },
    {
        path: '', 
        component: BlanklayoutComponent,
        children: [
            { path: 'home', loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent) },
            { path: 'uploads', loadComponent: () => import('./pages/uploads/uploads.component').then(m => m.UploadsComponent) },
            { path: 'settings', loadComponent: () => import('./pages/settings/settings.component').then(m => m.SettingsComponent) },
        ]},
    { path: '**', component: NotfoundComponent }
];


    