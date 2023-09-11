import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/service/product.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  searchForm;
  constructor(
    private productService: ProductService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.searchForm = this.formBuilder.group({
      page: [1],
      limit: [10],
      id: ['', Validators.required],
      description: ['', [Validators.required, Validators.maxLength(200)]],
      amount: ['', Validators.maxLength(200)],
      amountPrice: ['', Validators.maxLength(200)],
      totalPage: [''],
    });
  }
  data = [] as any;
  totalPage = 0;
  actualPage = 0;

  ngOnInit() {
    this.load();
    this.searchForm.valueChanges.subscribe(() => {
      this.load();
    });
  }

  openCreate() {
    this.router.navigate(['/produto/cadastro']);
  }

  async load() {
    await this.productService.list(this.searchForm.value).then((res) => {
      this.data = res.items;
      this.totalPage = res.totalPages;
      this.actualPage = res.page;
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

  async tablePage(mode: 'previous' | 'next') {
    const { page, limit } = this.searchForm.value;
    if (mode === 'previous' && page) {
      this.searchForm.patchValue({ page: page - 1 });
    }

    if (mode === 'next' && page) {
      this.searchForm.patchValue({ page: page + 1 });
    }

    await this.load();
  }
}
