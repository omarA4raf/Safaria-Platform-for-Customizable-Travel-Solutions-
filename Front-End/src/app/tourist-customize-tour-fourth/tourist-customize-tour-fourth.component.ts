import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faHotel,
  faUtensils,
  faLandmark,
  faPrint,
  faHome,
  faArrowRightFromBracket,
  faFilePdf,
} from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../services/auth.service';
import { TouristCustomizeTourFourthService } from './tourist-customize-tour-fourth.service';


interface TripItem {
  id: number;
  name: string;
  type: 'hotel' | 'restaurant' | 'place';
  description: string;
}

interface DayPlan {
  dayNumber: number;
  date: string;
  items: TripItem[];
}

@Component({
  selector: 'app-tourist-customize-tour-fourth',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './tourist-customize-tour-fourth.component.html',
  styleUrls: ['./tourist-customize-tour-fourth.component.css'],
})
export class TouristCustomizeTourFourthComponent implements OnInit {
  // Font Awesome icons
  faHotel = faHotel;
  faUtensils = faUtensils;
  faLandmark = faLandmark;
  faPrint = faPrint;
  faHome = faHome;
  faArrowRightFromBracket = faArrowRightFromBracket;
  // Add it to your component class
  faFilePdf = faFilePdf;

  currentStep = 4;
  steps = ['Destination', 'Tourism Type', 'Trip Duration', 'Summary'];
  tripDays: DayPlan[] = [];
  isLoading = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private tourService: TouristCustomizeTourFourthService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    // this.checkAuthentication();
    this.generateFakeTripData(3);
  }

  checkAuthentication(): void {
    if (
      !this.authService.isLoggedIn() ||
      this.authService.getUserType() !== 'TOURIST'
    ) {
      this.authService.logout();
      this.router.navigate(['/login']);
    }
  }

  generateFakeTripData(days: number): void {
    const cities = ['Paris', 'Rome', 'Barcelona', 'Tokyo', 'New York'];
    const hotelNames = [
      'Grand Plaza Hotel',
      'Sunset Resort',
      'Mountain View Inn',
      'Beachfront Paradise',
      'Downtown Suites',
    ];
    const restaurantNames = [
      'La Bella Italia',
      'Sakura Sushi',
      'Le Petit Bistro',
      'The Steakhouse',
      'Ocean View Restaurant',
    ];
    const placeNames = [
      'Eiffel Tower',
      'Colosseum',
      'Sagrada Familia',
      'Shibuya Crossing',
      'Central Park',
    ];

    const today = new Date();
    this.tripDays = [];

    for (let i = 0; i < days; i++) {
      const date = new Date();
      date.setDate(today.getDate() + i);

      const formattedDate = date.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });

      this.tripDays.push({
        dayNumber: i + 1,
        date: formattedDate,
        items: [
          {
            id: 1,
            name: hotelNames[Math.floor(Math.random() * hotelNames.length)],
            type: 'hotel',
            description: 'Check-in and relax after your journey',
          },
          {
            id: 2,
            name: restaurantNames[
              Math.floor(Math.random() * restaurantNames.length)
            ],
            type: 'restaurant',
            description: 'Lunch with local cuisine',
          },
          {
            id: 3,
            name: placeNames[Math.floor(Math.random() * placeNames.length)],
            type: 'place',
            description: 'Explore this famous landmark',
          },
          {
            id: 4,
            name: restaurantNames[
              Math.floor(Math.random() * restaurantNames.length)
            ],
            type: 'restaurant',
            description: 'Dinner with beautiful views',
          },
        ],
      });
    }
  }

  getIcon(type: 'hotel' | 'restaurant' | 'place') {
    switch (type) {
      case 'hotel':
        return this.faHotel;
      case 'restaurant':
        return this.faUtensils;
      case 'place':
        return this.faLandmark;
      default:
        return null;
    }
  }

  printPlan(): void {
    const printContent: HTMLElement | null =
      document.getElementById('printable-content');
    const WindowPrt: Window | null = window.open(
      '',
      '',
      'left=0,top=0,width=900,height=900,toolbar=0,scrollbars=0,status=0'
    );

    if (WindowPrt && printContent) {
      // Clone the content to avoid modifying the original DOM
      const contentClone: HTMLElement = printContent.cloneNode(
        true
      ) as HTMLElement;

      // Remove all icon elements from the cloned content
      const icons: NodeListOf<Element> = contentClone.querySelectorAll(
        'fa-icon, .fa-icon, .timeline-badge'
      );
      icons.forEach((icon: Element) => icon.remove());

      WindowPrt.document.write(`
        <html>
          <head>
            <title>Tour Itinerary</title>
            <style>
              body { font-family: Arial, sans-serif; margin: 20px; }
              h1 { color: #fb921d; text-align: center; }
              .day-plan { margin-bottom: 30px; page-break-inside: avoid; }
              .day-header { border-bottom: 2px solid #71a7b8; padding-bottom: 5px; margin-bottom: 15px; }
              .timeline { position: relative; padding-left: 0; }
              .timeline-item { position: relative; margin-bottom: 20px; }
              .timeline-content { padding-left: 0; margin-left: 0; }
              .item-title { font-weight: bold; margin-bottom: 5px; }
              .item-type { color: #666; font-style: italic; }
              .badge { padding-left: 0.5em; }
              @page { size: auto; margin: 10mm; }
            </style>
          </head>
          <body>
            <h1>Your Custom Tour Plan</h1>
            ${contentClone.innerHTML}
          </body>
        </html>
      `);
      WindowPrt.document.close();
      WindowPrt.focus();
      setTimeout(() => {
        WindowPrt.print();
        WindowPrt.close();
      }, 500);
    } else {
      // Fallback to regular print if popup is blocked
      const originalDisplay: string[] = [];
      const icons: NodeListOf<Element> = document.querySelectorAll(
        'fa-icon, .fa-icon, .timeline-badge'
      );

      // Hide icons
      icons.forEach((icon: Element) => {
        originalDisplay.push((icon as HTMLElement).style.display);
        (icon as HTMLElement).style.display = 'none';
      });

      // Adjust timeline spacing
      const timelines: NodeListOf<Element> =
        document.querySelectorAll('.timeline');
      timelines.forEach((timeline: Element) => {
        (timeline as HTMLElement).style.paddingLeft = '0';
      });

      window.print();

      // Restore icons after printing
      icons.forEach((icon: Element, index: number) => {
        (icon as HTMLElement).style.display = originalDisplay[index];
      });
      timelines.forEach((timeline: Element) => {
        (timeline as HTMLElement).style.paddingLeft = '';
      });
    }
  }

  navigateToDashboard(): void {
    this.router.navigate(['/touristdashboardhome']);
  }

  async downloadPDF(): Promise<void> {
    if (!isPlatformBrowser(this.platformId)) {
      console.warn('PDF download is only available in the browser');
      return;
    }
  
    console.log('Download button clicked');
    this.isLoading = true;
  
    try {
      // Dynamically import libraries
      const { jsPDF } = await import('jspdf');
      const html2canvas = (await import('html2canvas')).default;
  
      const element = document.getElementById('printable-content');
      if (!element) {
        throw new Error('PDF content not found');
      }
  
      // Create a clone for PDF generation
      const clone = element.cloneNode(true) as HTMLElement;
      clone.style.position = 'fixed'; // Changed from absolute to fixed
      clone.style.top = '0';
      clone.style.left = '0';
      clone.style.width = '100%';
      clone.style.zIndex = '9999';
      clone.style.backgroundColor = 'white';
      document.body.appendChild(clone);
  
      // Apply print styles to the clone
      const style = document.createElement('style');
      style.innerHTML = `
        .no-print { display: none !important; }
        .timeline-badge { display: none !important; }
        .timeline { padding-left: 0 !important; }
        .timeline::before { display: none !important; }
        .timeline-content { 
          border-left: none !important;
          page-break-inside: avoid !important;
        }
        .day-plan { 
          background-color: white !important;
          page-break-inside: avoid !important;
          break-inside: avoid !important;
          opacity: 1 !important;
        }
        .card { 
          box-shadow: none !important; 
          border: 1px solid #ddd !important;
          page-break-inside: avoid !important;
        }
        body { 
          background: white !important;
          -webkit-print-color-adjust: exact !important;
          print-color-adjust: exact !important;
        }
      `;
      clone.appendChild(style);
  
      // Ensure all content is visible
      clone.querySelectorAll('*').forEach(el => {
        const element = el as HTMLElement;
        element.style.opacity = '1';
        element.style.visibility = 'visible';
        element.style.display = '';
      });
  
      // Special handling for first day
      const firstDay = clone.querySelector('.day-plan:first-child');
      if (firstDay) {
        (firstDay as HTMLElement).style.backgroundColor = 'white';
        (firstDay as HTMLElement).style.opacity = '1';
      }
  
      // Generate PDF
      const canvas = await html2canvas(clone, {
        scale: 2,
        logging: true,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#FFFFFF',
        scrollX: 0,
        scrollY: 0,
        windowWidth: clone.scrollWidth,
        windowHeight: clone.scrollHeight,
        ignoreElements: (el) => el.classList.contains('no-print')
      });
  
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 210; // A4 width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
  
      // Add content to PDF
      pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, imgWidth, imgHeight);
      
      // Add new pages if content is too long
      let heightLeft = imgHeight;
      let position = 0;
      const pageHeight = 295; // A4 height in mm
      
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
  
      pdf.save('Tour_Itinerary.pdf');
  
      // Clean up
      document.body.removeChild(clone);
    } catch (error) {
      console.error('Error generating PDF:', error);
    } finally {
      this.isLoading = false;
    }
  }
  
  logout(): void {
    this.authService.logout();
    // this.router.navigate(['/login']);
  }
}
