import { authenticateModel } from './modelsFilme/authenticate';
import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { filme } from './modelsFilme/GetAllFilme';
import { MessageService } from 'primeng/api';

@Component({
  selector: '',
  templateUrl: './app-filme.component.html',
  styleUrls: ['./app-filme.component.css'],
  providers: [MessageService]
})
export class AppFilmeComponent implements OnInit {

  url = 'http://localhost:8080';
  filme: filme[];
  position!: string;
  displayPosition: boolean | undefined;
  displayPositionCreate: boolean | undefined;
  username = '';
  pass = '';

  titulo = "";
  descricao = "";

  autenticado = false;
  token = '';

  constructor(
    private httpClient: HttpClient,
    private messageService: MessageService
  ) {
    this.filme = [];
  }

  // Headers
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  showPositionDialog(position: string) {
    this.position = position;
    this.displayPosition = true;
  }

  showPositionDialogCreate(position: string) {
    this.position = position;
    this.displayPositionCreate = true;
  }

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    return this.httpClient.get(this.url + "/api/filme").subscribe((result: any) => {
      this.filme = [];
      for (var item of result) {
        this.filme.push({ id: item.id, title: item.title, description: item.description, published: item.published });
      }
    })
  }

  authenticate(username: string, pass: string) {
    if (username !== null || username !== undefined || pass !== null || pass !== undefined) {
      this.httpClient.post(this.url + "/api/auth", `{"email":"${username}", "password":"${pass}"}`, this.httpOptions).subscribe((result: any) => {
        if (!result.ok) {
          this.messageService.add({ key: 'authenticatenull', severity: 'error', summary: 'Error', detail: 'Usuário e/ou senha inválido(s)' });
        } else {
          this.username = "";
          this.pass = "";
          this.token = result.token;
          this.displayPosition = false;
          this.autenticado = true
          this.messageService.add({ key: 'authenticateOk', severity: 'success', summary: 'success' });
        }
      })
    } else {
      this.messageService.add({ key: 'authenticatenull', severity: 'error', summary: 'Error', detail: 'Usuário e/ou senha inválido(s)' });
    }
  }

  deleteFilme(id: number) {
    console.log(this.token);
    debugger;
    if (this.token !== "") {
      this.httpClient.delete(this.url + "/api/filme/" + id, { headers: new HttpHeaders({ 'x-auth-token': this.token }) }).subscribe((result: any) => {
        debugger;
        console.log(!result.ok);
        if (!result.ok) {
          this.messageService.add({ key: 'authenticateOk', severity: 'error', summary: 'Error', detail: "Faça login." });
        } else {
          this.messageService.add({ key: 'authenticateOk', severity: 'success', summary: 'success', detail: 'Filme excluido com sucesso' });
          this.getAll();
        }
      })
    } else {
      this.messageService.add({ key: 'authenticateOk', severity: 'error', summary: 'Error', detail: "Faça login." });
    }
  }

  createFilme(titulo: string, decricao: string) {
    if (titulo !== "") {
      if (this.token !== "") {
        this.httpClient.post<any>(this.url + "/api/filme", { title: titulo, description: decricao, published: 1 },
          { headers: new HttpHeaders({ 'x-auth-token': this.token }) }).subscribe((result: any) => {
            debugger;
            if (!result.ok !== undefined || !result.ok !== null) {
              if (result.title !== undefined || result.title !== null) {
                if (result.title.length > 0) {
                  this.messageService.add({ key: 'authenticateOk', severity: 'success', summary: 'success', detail: 'Filme criado com sucesso' });
                  this.displayPositionCreate = false;
                  this.descricao = "";
                  this.titulo = "";
                  this.getAll();
                } else {
                  this.messageService.add({ key: 'authenticateOk', severity: 'error', summary: 'Error', detail: "Faça login." });
                }
              } else {
                this.messageService.add({ key: 'authenticateOk', severity: 'error', summary: 'Error', detail: "Faça login." });
              }
            } else {
              this.messageService.add({ key: 'authenticateOk', severity: 'error', summary: 'Error', detail: "Faça login." });
            }


          })
      } else {
        this.messageService.add({ key: 'authenticateOk', severity: 'error', summary: 'Error', detail: "Faça login." });
      }
    } else {
      this.messageService.add({ key: 'authenticateOk', severity: 'error', summary: 'Error', detail: "Titulo Obrigatório." });
    }

  }

}
