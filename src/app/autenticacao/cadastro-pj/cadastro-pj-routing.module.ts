import { Component, NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

/**
 * CadastroPjComponent - Wrapper
 * CadastrarPjComponent - Tela de cadastro
 */

import {
    CadastroPjComponent,
    CadastrarPjComponent
} from './components';



export const CadastroPjRoutes: Routes = [ 
    {
        path: 'cadastro-pj', //url 
        component: CadastroPjComponent, // componente pai. 
        children:[
           { 
            path: '',
            component: CadastrarPjComponent // tela de cadastro.
           } 
        ]
    }
]

@NgModule({
    imports:[
        RouterModule.forChild(CadastroPjRoutes) //Indica que é um submodulo. Será adicionando ao app.module raiz 
    ],
    exports: [
        RouterModule
    ]
})

export class CadastroPjRoutingModule {}
