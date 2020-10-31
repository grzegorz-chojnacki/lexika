/*import { Component, OnInit } from '@angular/core'
@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  public constructor() { }

  public ngOnInit(): void {
  }

}
*/
import { Component, OnInit } from '@angular/core';
import { element } from 'protractor';


@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})

export class AccountComponent implements OnInit {
  avatarURL: any = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBw4HDw0PExAREhAXEQ0XEBEQDhARFQ8WIBgXFiATFR8YHiosGSYmHRgTLT0tJTUrLi4uFyszODM4NygtLisBCgoKBQUFDgUFDisZExkrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIAGAAYAMBIgACEQEDEQH/xAAaAAEAAwEBAQAAAAAAAAAAAAAAAQQGBQMC/8QAMBAAAgECAwIOAgMAAAAAAAAAAAECAwQFEUExURQhIjJCYXGBkbHB0fDxBhIToeH/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8A3oAAAAAAAAAAAAAAAAAAAF3CbThU+PmrJy69y+bgPuxwuVzlJ8mOj1fYdWnhNCHRz6236F5LIAUqmFUJ9HLri36nJvsLlbJyjyo670aMAYwF/F7RW081zZZtdT1XkUAAAAAAAaDAIZUpPfJ+n+mfO9+P1M4TjqpZ9z+mB1gQAJBAA5uPQ/aknukvYzx38fq/rTjHVy/pfEcAAAAAAAFixunaTUtNjW9fPIrntbW07p5RXa9EBqqVWNaKlF5p7D7KWHYfwPj/AGbeq2R8C8BB81akaKcm8ktrPso4hYcMy5TTWxbY+AHCv7p3c3LTZFbkVj2ubadq8pLsejPEAAADAAFiytZXc1FbOk9yNPb0I28VGKyXmeGGWvBaaT5zycvYtgASQAAJA8rihG4i4yWa8uwzF7au0m4vZ0XvRqypidrwqm10lm4+wGXAAAt4XR/nqwWieb7uP2KjOt+PQznUluSXj9Ad4EACQQAJBAAkEADL4pR/gqzWj4138fuVDr/kMMpU5b4teH2cgD//2Q==';
  fnameDisabled = true;
  snameDisabled = true;
  emailDisabled = true;
  passwordDisabled = true;
  pictureDisabled = true;

  fname = 'Użytkownik';
  sname = 'Użytkowski';
  email = 'adres@email.uzytkownika';

  constructor() { }
  ngOnInit(): void {
  }
  saveFName(event){
    this.fname = event.target.value;
  }
  saveSName(event){
    this.sname = event.target.value;
  }
  saveEmail(event){
    this.email = event.target.value;
  }
  onFileChanged(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
        this.avatarURL = event.target.result;
  }
}
  }

}
