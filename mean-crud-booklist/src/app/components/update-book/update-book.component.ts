import { Component, OnInit, NgZone } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CrudService } from 'src/app/service/crud.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-update-book',
  templateUrl: './update-book.component.html',
  styleUrls: ['./update-book.component.css']
})
export class UpdateBookComponent implements OnInit {
  bookForm: FormGroup;
  isbn!: string;  // Definite assignment assertion

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private crudService: CrudService,
    private activatedRoute: ActivatedRoute,
    private location: Location
  ) {
    this.bookForm = this.formBuilder.group({
      isbn: [''],
      title: [''],
      author: [''],
      description: [''],
      published_year: [''],
      publisher: ['']
    });
  }

  ngOnInit(): void {
    // Get the ISBN from the route parameters
    this.isbn = this.activatedRoute.snapshot.paramMap.get('isbn')!;

    // Fetch the existing book details using ISBN
    this.crudService.getBookByIsbn(this.isbn).subscribe((book) => {
      this.bookForm.patchValue(book);  // Populate the form with the fetched book data
    });
  }

  onSubmit(): any {
    // Send the updated data to the backend using ISBN
    this.crudService.UpdateBook(this.isbn, this.bookForm.value)  // Updated method name
      .subscribe({
        next: () => {
          // Navigate to the list of books after successful update
          this.ngZone.run(() => this.router.navigateByUrl('/books-list'));
        },
        error: (err) => {
          console.log(err);
        }
      });
  }

  goBack(): void {
    this.location.back();  // Navigate back to the previous page
  }
}
