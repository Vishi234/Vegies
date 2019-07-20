import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  items: Array<any> = [];
  constructor() {
    this.items = [
      {
        name: "Everfresh Flowers",
        image: "https://www.bigbasket.com/media/uploads/p/s/10000148_24-fresho-onion.jpg",
        unit: "1 Kg",
        oldPrice: "Rs 250",
        newPrice: "Rs 30",
        id: "1"

      },
      {
        name: "Festive Deer",
        image: "https://www.bigbasket.com/media/uploads/p/s/10000159_25-fresho-potato.jpg",
        unit: "1 Kg",
        oldPrice: "Rs 250",
        newPrice: "Rs 30",
        id: "2"
      },
      {
        name: "Morning Greens",
        image: "https://www.bigbasket.com/media/uploads/p/s/10000200_17-fresho-tomato-hybrid.jpg",
        unit: "1 Kg",
        oldPrice: "Rs 250",
        newPrice: "Rs 30",
        id: "3"
      },
      {
        name: "Bunch of Love",
        image: "https://www.bigbasket.com/media/uploads/p/s/10000068_22-fresho-capsicum-green.jpg",
        unit: "1 Kg",
        oldPrice: "Rs 250",
        newPrice: "Rs 30",
        id: "4"
      },
      {
        name: "Blue Clear",
        image: "https://www.bigbasket.com/media/uploads/p/s/241600_5-tata-salt-salt-iodized.jpg",
        unit: "1 Kg",
        oldPrice: "Rs 250",
        newPrice: "Rs 30",
        id: "5"
      },
      {
        name: "Evening Clouds",
        image: "https://www.bigbasket.com/media/uploads/p/s/283426_2-india-gate-basmati-rice-feast-rozzana.jpg",
        unit: "1 Kg",
        oldPrice: "Rs 250",
        newPrice: "Rs 30",
        id: "6"
      },
      {
        name: "Fontains in Shadows",
        image: "https://www.bigbasket.com/media/uploads/p/s/10000188_11-fresho-palak.jpg",
        unit: "1 Kg",
        oldPrice: "Rs 250",
        newPrice: "Rs 30",
        id: "7"
      },
      {
        name: "Kites in the Sky",
        image: "https://www.bigbasket.com/media/uploads/p/s/40026269_2-milkfood-rich-desi-ghee.jpg",
        unit: "1 Kg",
        oldPrice: "Rs 250",
        newPrice: "Rs 30",
        id: "8"
      },
      {
        name: "Sun Streak",
        image: "https://www.bigbasket.com/media/uploads/p/s/10000668_12-fresho-cucumber-english.jpg",
        unit: "1 Kg",
        oldPrice: "Rs 250",
        newPrice: "Rs 30",
        id: "9"
      }
    ]
  }

  ngOnInit() {
  }

}
