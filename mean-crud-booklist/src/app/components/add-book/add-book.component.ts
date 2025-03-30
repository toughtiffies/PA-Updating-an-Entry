import { Component, OnInit, NgZone } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router'; // ActivatedRoute is not used in this case
import { CrudService } from 'src/app/service/crud.service';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})

export class AddBookComponent implements OnInit {
  bookForm: FormGroup;
  isEditMode: boolean = false; // Set a default value to avoid undefined
  bookId: any;

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private crudService: CrudService
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
    // Logic to check if you're in edit mode (e.g., from the route params)
  }

  onSubmit(): any {
    if (this.isEditMode && this.bookId) {
      // If in edit mode, update the existing book
      this.crudService.UpdateBook(this.bookId, this.bookForm.value).subscribe({
        next: (response) => {
          console.log('Book updated successfully', response);
          this.ngZone.run(() => this.router.navigateByUrl('/books-list'));
        },
        error: (err: any) => {
          console.error('Error updating book:', err);
        }
      });
    } else {
      // If not in edit mode, add a new book
      this.crudService.AddBook(this.bookForm.value).subscribe({
        next: (response) => {
          console.log('Book added successfully', response);
          this.ngZone.run(() => this.router.navigateByUrl('/books-list'));
        },
        error: (err: any) => {
          console.error('Error adding book:', err);
        }
      });
    }
  }
}