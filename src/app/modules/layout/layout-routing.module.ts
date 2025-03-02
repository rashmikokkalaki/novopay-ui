import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LayoutComponent } from './layout.component';

const routes: Routes = [{
	path: '',
	component: LayoutComponent,
	children: [
		{
			path: '',
			loadChildren: () => import('../dashboard/dashboard.module').then((m) => m.DashboardModule)
		},
		{
			path: 'client/create',
			loadChildren: () => import('../create-client/create-client.module').then(m => m.CreateClientModule)
		},
		{
			path: 'product/create',
			loadChildren: () => import('../create-product/create-product.module').then(m => m.CreateProductModule)
		},
		{
			path: 'client/view/:id',
			loadChildren: () => import('../view-client/view-client.module').then(m => m.ViewClientModule)
		}


	]
}];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class LayoutRoutingModule { }
