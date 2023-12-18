import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FileData } from 'src/app/models';
import { AuthService } from 'src/app/services/auth.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss'],
})
export class DetalleComponent implements OnInit {

  email: string;
  admin: boolean = false;

  newDatas : FileData[] = [];
  newData : FileData = {
    categoria:null,
    detalle:null,
    id: null,
    nombre:null,
    newFile:null
  };
  uid: string = null;
/*   usuario='usuario';
  campo: 'usuarios'; */
  /* private path: 'feed/{{categorias}}/data'; */
  constructor(private authService: AuthService, private firestoreService :FirestoreService, private router:Router, private activedRoute: ActivatedRoute) {
    this.authService.authState().subscribe( res => {
      console.log('res => ', res);
      if (res) {
        this.admin = res.uid === environment.adminuid ? true : false;
      } /* else {
        this.admin = false
      } */
      
    })
   }
  
  /* const path: 'feed/'; */
  ngOnInit() {
    this.authService.authState().subscribe(res => {
      console.log('res-> ', res);
        if (res){
          this.email = res.email;
        };
      })
  const museoData= this.firestoreService.getMuseoFeed();
  
    console.log('el museo a editar es =>', museoData);
    if (museoData !== undefined){
      this.newData = museoData;
      console.log("newDatas ==>", this.newDatas);
    }
    if(museoData === undefined){
      this.router.navigate(['feed/']);
    }
    this.authService.getUid();
    console.log("uid", this.authService.getUid());
    
  }

  actualizar(){
    const data = this.newData;
    const path = 'feed';
    const id = this.uid;
    this.firestoreService.saveData(path, id, data).then(res => {
      console.log('Actualizado con exito!');
    })
  }

  getMuseum(){

    this.firestoreService.getCollection<FileData>('feed/').subscribe(res => {
      this.newDatas = res;
      console.log("tomar museo => ", res);
    });
  }

  edit(direccion:string){
    this.router.navigate([direccion])
  }
  update(direccion:string){
    this.router.navigate([direccion])
  }
  delete(){
    this.router.navigate(['/panel'])
  }


}
