import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ProducerComponent } from './producer.component';

const routes: Routes = [
    { path: 'perfil-productor', component: ProducerComponent}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProducerRouting {}
