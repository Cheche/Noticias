import { NoticiasService } from './noticias.service';
import {
  HttpBackend,
  HttpClient
} from '@angular/common/http';
import {
  HttpTestingController,
  HttpClientTestingModule
} from '@angular/common/http/testing';
import { TestBed, inject } from '@angular/core/testing';



describe('NoticiasService', () => {

  let service: NoticiasService;
  let httpClient: HttpClient;
  let httpMock: HttpTestingController;


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [NoticiasService]
    });

    httpClient = TestBed.get(HttpClient);
    httpMock = TestBed.get(HttpTestingController);
    service = TestBed.get(NoticiasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  describe('Test for getTopHeadlinesCategoria', () => {
    it('should return categories', () => {
      // Arrange
      // const mockResponse = {
      //   results: [
      //     {
      //       "status": "ok",
      //       "totalResults": "9999"
      //       "articles": [],
      //     }
      //   ]
      // };
      let dataError, dataResponse;
      // Act
      service.getTopHeadLines().subscribe((response) => {
        dataResponse = response.status;
        expect(dataResponse).toEqual('ok');
      }, (error) => {
        dataError = error;
        expect(dataError).toBeUndefined();
      });

      // const req = httpMock.expectOne(`https://randomuser.me/api/?results=25`);
      // req.flush(mockResponse);

      // expect(req.request.url).toEqual(`https://randomuser.me/api/?results=25`);
      // expect(req.request.method).toEqual('GET');
    });
  });

});
