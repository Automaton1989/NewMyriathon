/* 
  ||--------------------------------||
  ||   Main Component for Website   ||
  ||--------------------------------||
*/

import { Component, OnInit, Input } from '@angular/core';
import { trigger, transition, style, animate } from "@angular/animations";

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css'],
  animations: [
    trigger('carouselAnimation', [
      transition('void => *', [
        style({ opacity: 0 }),
        animate('300ms', style({ opacity: 1 }))
      ]),
      transition('* => void', [
        animate('300ms', style({ opacity: 0 }))
      ])
    ])
  ]
})

export class CarouselComponent implements OnInit {

  @Input() bigSlides;
  @Input() littleSlides;
  
  txt = [
    "Myriathon Assist ran in the summer of 2018, in support of Direct Relief.  We raised over $1,600 during the marathon!",
    "Myriathon 1 Up ran in the winter of 2018, in support of Extra Life.  We raised over $1,300 during the marathon!",
    "Myriathon Checkpoint ran in the summer of 2019, in support of Checkpoint Org.  We raised over $1,500 during the marathon!",
    "Myriathon Home is an upcoming marathon slated for summer 2020, in support of Direct Relief.  The event will run from June 8th to June 14th."
  ];

  title = [
    "Myriathon Assist - Summer 2018",
    "Myriathon 1-Up - Winter 2018",
    "Myriathon Checkpoint - Summer 2019",
    "Myriathon Home - Summer 2020"
  ];

  currentSlide = 0;
  currentText = 0;
  currentTitle = 0;


  constructor() { }

/* 
  ||--------------------------------||
  ||       On Init Functions        ||
  ||--------------------------------||
*/

  ngOnInit() 
  {
    this.preloadImages();
  }

  /*
  Load images into carousel for faster loading
  */

  preloadImages()
  {
    for (const slide of this.bigSlides)
    {
      new Image().src = slide.src;
    }
    for (const slide of this.littleSlides)
    {
      new Image().src = slide.src;
    }
  }

  /*
  When the previous button is clicked on the carousel, go back 1 slide,
  or return to last slide if on first slide
  */

  onPreviousClick()
  {
    const previousSlide = this.currentSlide - 1;
    const previousText = this.currentText - 1;
    const previousTitle = this.currentTitle - 1;
    this.currentSlide = previousSlide < 0 ? this.bigSlides.length - 1: previousSlide;
    this.currentText = previousText < 0 ? this.txt.length - 1: previousText;
    this.currentTitle = previousTitle < 0 ? this.title.length - 1: previousTitle;
  }

  /*
  When the next button is clicked on the carousel, go forward 1 slide,
  or return the the first slide if on last slide
  */

  onNextClick()
  {
    const nextSlide = this.currentSlide + 1;
    const nextText = this.currentText + 1;
    const nextTitle = this.currentTitle + 1;
    this.currentText = nextText === this.txt.length ? 0 : nextText;
    this.currentSlide = nextSlide === this.bigSlides.length ? 0 : nextSlide;
    this.currentTitle = nextTitle === this.title.length ? 0 : nextTitle;
  }


}
