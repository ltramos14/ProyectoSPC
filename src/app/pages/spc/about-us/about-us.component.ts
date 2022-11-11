import { Component, OnInit } from "@angular/core";
import { Icon } from "@visurel/iconify-angular";

import icCode from "@iconify/icons-ic/twotone-code";
import icEmail from "@iconify/icons-ic/twotone-email";
import icMore from "@iconify/icons-ic/twotone-more-vert";

interface Person {
  names: string;
  image?: string;
  profesion: string;
  contacts?: Contact[];
}

interface Contact {
  name: string;
  icon: Icon;
  url: string;
}

@Component({
  selector: "vex-about-us",
  templateUrl: "./about-us.component.html",
  styleUrls: ["./about-us.component.scss"],
})
export class AboutUsComponent implements OnInit {
  icCode = icCode;
  icEmail = icEmail;
  icMore = icMore;

  persons: Person[] = [
    {
      names: "Nicolás Nieto Cárdenas",
      image: "https://avatars.githubusercontent.com/u/48180657?v=4",
      profesion: "Estudiante de Ingeniería de sistemas",
      contacts: [
        {
          name: "Correo electrónico",
          url: "jnnieto@ucundinamarca.edu.co",
          icon: icEmail,
        },
        {
          name: "GitHub",
          url: "https://github.com/jnnieto",
          icon: icCode,
        },
      ],
    },
    {
      names: "Tatiana Ramos Villanueva",
      image: "https://avatars.githubusercontent.com/u/48187187?v=4",
      profesion: "Estudiante de Ingeniería de sistemas",
      contacts: [
        {
          name: "Correo electrónico",
          url: "ltramos@ucundinamarca.edu.co",
          icon: icEmail,
        },
        {
          name: "GitHub",
          url: "https://github.com/ltramos14",
          icon: icCode,
        },
      ],
    },
    {
      names: "Alejandro Ayure Flórez",
      image: "https://media.licdn.com/dms/image/C4E03AQG-v6cp1nmUqA/profile-displayphoto-shrink_400_400/0?e=1673481600&v=beta&t=uBjJUPSO0wWud8TuGRMQc26iLERbj6D4d_8rni02_w4",
      profesion: "Ingeniero de sistemas",
      contacts: [
        {
          name: "Correo electrónico",
          url: "aayure@ucundinamarca.edu.co",
          icon: icEmail,
        },
      ],
    },
  ];

  constructor() { }

  ngOnInit(): void { }
}
