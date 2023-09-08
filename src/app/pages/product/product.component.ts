import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/service/product.service';
import { MatDialog } from '@angular/material/dialog';
import { ChangeOrAddPriceComponent } from './change-or-add-price/change-or-add-price.component';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  constructor(private productService: ProductService, private router: Router) {}
  data = [] as any;

  ngOnInit() {
    this.load();
  }

  openCreate() {
    window.location.href = 'http://localhost:4200/produto/cadastro';
  }

  async load() {
    this.productService.list().then((res) => {
      this.data = res;
    });
  }

  async delete(_productId: string) {
    Swal.fire({
      title: 'Tem certeza?',
      text: 'Não será possível reverter essa ação!',
      icon: 'warning',
      showCloseButton: true,
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Aguarde',
          text: 'Deletando...',
          icon: 'info',
          allowOutsideClick: false,
          showConfirmButton: false,
        });

        this.productService
          .delete(_productId)
          .then(() => {
            Swal.close();
            Swal.fire({
              title: 'Sucesso',
              icon: 'success',
              showConfirmButton: false,
            });
          })
          .catch(() => {
            Swal.close();
            Swal.fire({
              title: 'Erro',
              icon: 'error',
              showConfirmButton: false,
            });
          })
          .finally(() => {
            this.load();
          });
      } else {
        Swal.close();
      }
    });
  }

  edit(id: any) {
    this.router.navigate(['/produto/edicao'], {
      queryParams: { _productId: id },
    });
  }
}
