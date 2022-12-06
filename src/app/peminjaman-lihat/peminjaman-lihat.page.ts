import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { ApiService } from '../api.service';
import { Http } from '@capacitor-community/http';
@Component({
  selector: 'app-peminjaman-lihat',
  templateUrl: './peminjaman-lihat.page.html',
  styleUrls: ['./peminjaman-lihat.page.scss'],
})
export class PeminjamanLihatPage implements OnInit {
  kode_peminjaman: any;
  nama: any;
  nim: any;
  nama_lembaga: any;
  jenis_peminjaman: any;

  constructor(private route: ActivatedRoute, private router: Router, public _apiService: ApiService, private alertController: AlertController, public LoadingController: LoadingController) {
    this.route.params.subscribe((param: any) => {
      this.kode_peminjaman = param.kode_peminjaman;
      console.log(this.kode_peminjaman);
      this.ambilPeminjaman(this.kode_peminjaman);
    });
  }

  ngOnInit() {}

  ionViewDidEnter() {
    console.log('jika selesai loading');
    this.route.params.subscribe((param: any) => {
      this.kode_peminjaman = param.kode_peminjaman;
      console.log(this.kode_peminjaman);
    });
  }

  ambilPeminjaman(kode_peminjaman: any) {
    this._apiService.ambilPeminjaman(this.kode_peminjaman).subscribe(
      (res: any) => {
        console.log('sukses', res);
        let data = res;
        this.kode_peminjaman = data.kode_peminjaman;
        this.nim = data.nim;
        this.nama = data.nama;
        this.nama_lembaga = data.nama_lembaga;
        this.jenis_peminjaman = data.jenis_peminjaman;
      },
      (error: any) => {
        console.log('gagal', error);
        this.alertController
          .create({
            header: 'Notifikasi',
            message: 'Gagal memuat data',
            buttons: ['OK'],
          })
          .then((res) => {
            res.present();
          });
      }
    );
  }
}
