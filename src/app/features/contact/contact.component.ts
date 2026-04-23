import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import emailjs from '@emailjs/browser';
import { environment } from '../../../environments/environment';
import { ToastrService } from 'ngx-toastr';
import { ChangeDetectorRef } from '@angular/core';


@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {

  isOpen = false;
  isSending = false;

  form = {
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    website: '' 
  };

  constructor(private toastr: ToastrService, private cdr: ChangeDetectorRef) { }


  open() {
    this.isOpen = true;
  }

  close() {
    this.isOpen = false;
  }

  clear() {
    this.form = {
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
      website: ''
    };
  }

  submit() {

    if (this.isSending) return;
    
    if (this.form.website) {
      this.toastr.error('Spam detected');
      return;
    }
    
    if (!this.form.name || !this.form.subject || !this.form.message) {
      this.toastr.warning('Please fill required fields');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (this.form.email && !emailRegex.test(this.form.email)) {
      this.toastr.warning('Invalid email');
      return;
    }

    this.isSending = true;

    const payload = {
      ...this.form,
      time: new Date().toLocaleString()
    };

    emailjs
      .send(
        environment.emailjs.serviceId,
        environment.emailjs.templateId,
        payload,
        environment.emailjs.publicKey
      ).then(() => {

  this.toastr.success('Message sent successfully!');

  // delay closing modal
  setTimeout(() => {
    this.clear();
    this.close();
  }, 400);
this.clear();
        this.close();
})
    
      .catch((error) => {
        console.error('EmailJS Error:', error);

        setTimeout(() => {
          this.toastr.error('Failed to send message');
        }, 0);
      })
      .finally(() => {
        this.isSending = false;
      });
  }
}

