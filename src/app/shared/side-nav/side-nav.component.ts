import { Component } from '@angular/core';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent {
  
  openMenuFunction(){
   
    var open_menu_element = document.getElementsByClassName('open-menu')[0];
    open_menu_element.classList.add("hide");
    var body_element = document.getElementsByClassName('body')[0];
    body_element.classList.toggle("offcanvas-active");
    var close_menu_element = document.getElementsByClassName('close-menu')[0];
    close_menu_element.classList.remove("hide");

  }

  closeMenuFunction(){
    
    var open_menu_element = document.getElementsByClassName('open-menu')[0];
    open_menu_element.classList.remove("hide");
    var body_element = document.getElementsByClassName('body')[0];
    body_element.classList.toggle("offcanvas-active");
    var close_menu_element = document.getElementsByClassName('close-menu')[0];
    close_menu_element.classList.add("hide");
    
  }
}
