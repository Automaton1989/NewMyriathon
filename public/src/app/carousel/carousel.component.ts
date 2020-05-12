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
    "This is test text for src 1",
    "This is test text again for src 2",
    "this is test text another for src 3",
  ];

  title = [
    "This is the title for Slide 1",
    "This is the title for Slide 2",
    "This is the title for Slide 3"
  ];

  currentSlide = 0;
  currentText = 0;
  currentTitle = 0;


  constructor() { }

  ngOnInit() 
  {
    this.preloadImages();
  }

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

  onPreviousClick()
  {
    const previousSlide = this.currentSlide - 1;
    const previousText = this.currentText - 1;
    const previousTitle = this.currentTitle - 1;
    this.currentSlide = previousSlide < 0 ? this.bigSlides.length - 1: previousSlide;
    this.currentText = previousText < 0 ? this.txt.length - 1: previousText;
    this.currentTitle = previousTitle < 0 ? this.title.length - 1: previousTitle;
  }

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
