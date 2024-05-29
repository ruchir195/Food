import { Component } from '@angular/core';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent {
  
  openMenuFunction(): void {
    const openMenuElement = document.getElementsByClassName('open-menu')[0] as HTMLElement;
    if (openMenuElement) {
      openMenuElement.classList.add("hide");
    }
  
    const bodyElement = document.getElementsByClassName('body')[0] as HTMLElement;
    if (bodyElement) {
      bodyElement.classList.toggle("offcanvas-active");
    }
  
    const closeMenuElement = document.getElementsByClassName('close-menu')[0] as HTMLElement;
    if (closeMenuElement) {
      closeMenuElement.classList.remove("hide");
    }
  }
  
  closeMenuFunction(): void {
    const openMenuElement = document.getElementsByClassName('open-menu')[0] as HTMLElement;
    if (openMenuElement) {
      openMenuElement.classList.remove("hide");
    }
  
    const bodyElement = document.getElementsByClassName('body')[0] as HTMLElement;
    if (bodyElement) {
      bodyElement.classList.toggle("offcanvas-active");
    }
  
    const closeMenuElement = document.getElementsByClassName('close-menu')[0] as HTMLElement;
    if (closeMenuElement) {
      closeMenuElement.classList.add("hide");
    }
  }
  
}
