import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { DocumentsComponent } from './documents/documents.component';
import { MessagesComponent } from './messages/messages.component';
import { ContactsComponent } from './contacts/contacts.component';
import { DocumentEditComponent } from './documents/document-edit/document-edit.component';
import { DocumentDetailComponent } from './documents/document-detail/document-detail.component'; 
import { ContactEditComponent } from './contacts/contact-edit/contact-edit.component';
import { ContactDetailComponent } from './contacts/contact-detail/contact-detail.component';
import { PokemonComponent } from './pokemon/pokemon.component';
import { PokemonEditComponent } from './pokemon/pokemon-edit/pokemon-edit.component';
import { PokemonDetailsComponent } from './pokemon/pokemon-details/pokemon-details.component';


const appRoutes: Routes = [
    { path: '', redirectTo: '/documents', pathMatch: 'full'},
    { path: 'documents', component: DocumentsComponent, children: [
        { path: 'new', component: DocumentEditComponent },
        { path: ':id', component: DocumentDetailComponent },
        { path: ':id/edit', component: DocumentEditComponent }
    ]},

    { path: 'messages', component: MessagesComponent },
    
    { path: 'contacts', component: ContactsComponent, children: [
        { path: 'new', component: ContactEditComponent },
        { path: ':id', component: ContactDetailComponent },
        { path: ':id/edit', component: ContactEditComponent }
    ]},
    { path: 'pokemon', component: PokemonComponent, children: [
        { path: 'new', component: PokemonEditComponent },
        { path: ':id', component: PokemonDetailsComponent },
        { path: ':id/edit', component: PokemonEditComponent }
    ]}
];


@NgModule(
    {
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
    }
)

export class AppRoutingModule{

}




