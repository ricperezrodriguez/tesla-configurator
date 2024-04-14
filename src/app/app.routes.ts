import { Routes } from '@angular/router';
import { StepOneComponent } from './pages/step-one/step-one.component';
import { StepTwoComponent } from './pages/step-two/step-two.component';
import { StepThreeComponent } from './pages/step-three/step-three.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { stepTwoGuard } from './core/guards/stepTwo.guard';
import { stepThreeGuard } from './core/guards/stepThree.guard';

export const routes: Routes = [
  { path: 'step1', component: StepOneComponent },
  { path: 'step2', component: StepTwoComponent, canActivate: [stepTwoGuard] },
  {
    path: 'step3',
    component: StepThreeComponent,
    canActivate: [stepThreeGuard],
  },
  { path: '', redirectTo: '/step1', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },
];
