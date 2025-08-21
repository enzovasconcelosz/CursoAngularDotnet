import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { EventosComponent } from './components/eventos/eventos.component';
import { PalestrantesComponent } from './components/palestrantes/palestrantes.component';
import { ContatosComponent } from './components/contatos/contatos.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PerfilComponent } from './components/user/perfil/perfil.component';
import { EventoDetalhesComponent } from './components/eventos/evento-detalhes/evento-detalhes.component';
import { EventoListaComponent } from './components/eventos/evento-lista/evento-lista.component';
import { UserComponent } from './components/user/user.component';
import { LoginComponent } from './components/user/login/login.component';
import { CadastroUsuarioComponent } from './components/user/cadastro-usuario/cadastro-usuario.component';
import { HomeComponent } from './components/home/home.component';
import { PerfilDetalheComponent } from './components/user/perfil/perfil-detalhe/perfil-detalhe.component';
import { PalestranteListaComponent } from './components/palestrantes/palestrante-lista/palestrante-lista.component';
import { PalestranteDetalheComponent } from './components/palestrantes/palestrante-detalhe/palestrante-detalhe.component';
import { RedesSociaisComponent } from './components/redesSociais/redesSociais.component';

import { NavComponent } from './shared/nav/nav.component';
import { TituloComponent } from './shared/titulo/titulo.component';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { CollapseModule } from 'ngx-bootstrap/collapse';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { ptBrLocale } from 'ngx-bootstrap/locale';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgxCurrencyModule } from 'ngx-currency';

import { DateTimeFormatPipe } from './helpers/DateTimeFormat.pipe';

import { JwtInterceptor } from './interceptors/jwt.interceptor';

defineLocale('pt-br', ptBrLocale);

@NgModule({
  declarations: [
    AppComponent,
    EventosComponent,
    EventoDetalhesComponent,
    EventoListaComponent,
    PalestrantesComponent,
    PalestranteListaComponent,
    PalestranteDetalheComponent,
    NavComponent,
    DateTimeFormatPipe,
    ContatosComponent,
    DashboardComponent,
    PerfilComponent,
    PerfilDetalheComponent,
    TituloComponent,
    UserComponent,
    LoginComponent,
    CadastroUsuarioComponent,
    HomeComponent,
    RedesSociaisComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CollapseModule.forRoot(),
    FormsModule,
    TooltipModule.forRoot(),
    BsDropdownModule.forRoot(),
    BsDatepickerModule.forRoot(),
    PaginationModule.forRoot(),
    TabsModule.forRoot(),
    NgxCurrencyModule,
    ModalModule.forRoot(),
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
      progressBar: true,
    }),
    NgxSpinnerModule,
  ],
  // providers: [EventoService], Uma das formas de realizar injeção de dependência pra usar serviços no componente
  bootstrap: [AppComponent],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  ],
})
export class AppModule {}
