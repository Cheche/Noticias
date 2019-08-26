import { AppRoutingModule } from './../app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { IonicModule } from '@ionic/angular';
import { DataLocalService } from './data-local.service';
import { TestBed } from '@angular/core/testing';
import { IonicStorageModule } from '@ionic/storage';


describe('DataLocalService', () => {

  let service: DataLocalService;


  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [
        BrowserModule,
        IonicModule.forRoot(),
        IonicStorageModule.forRoot(),
        AppRoutingModule
      ],
      providers: [DataLocalService]
    });
    service = TestBed.get(DataLocalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('noticias vars', () => {
    it('noticias = []', () => {
      expect(service.noticias).toEqual([]);
    });
  });


});
