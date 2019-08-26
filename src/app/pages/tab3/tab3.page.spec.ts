import { IonicStorageModule } from '@ionic/storage';
import { DataLocalService } from 'src/app/services/data-local.service';
import { FormsModule } from '@angular/forms';
import { ComponentsModule } from './../../components/components.module';
import { CommonModule } from '@angular/common';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { Tab3Page } from './tab3.page';

describe('Tab3Page', () => {
  let component: Tab3Page;
  let fixture: ComponentFixture<Tab3Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [Tab3Page],
      imports: [
        IonicModule,
        CommonModule,
        ComponentsModule,
        FormsModule,
        IonicStorageModule.forRoot(),
        IonicModule.forRoot()
      ],
      providers: [
        DataLocalService
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Tab3Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
