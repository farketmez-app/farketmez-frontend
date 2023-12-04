import DisardaImage from "../../assets/images/disarda.png";
import MekandaImage from "../../assets/images/mekanda.png";
import EvdeImage from "../../assets/images/evde.png";
import FarketmezImage from "../../assets/images/farketmez.png";

const where = [
  {
    name: "Dışarda",
    selected: false,
    image: DisardaImage,
  },
  {
    name: "Mekanda",
    selected: false,
    image: MekandaImage,
  },
  {
    name: "Evde",
    selected: false,
    image: EvdeImage,
  },
  {
    name: "Farketmez",
    selected: false,
    image: FarketmezImage,
  },
];

const cost = [
  {
    name: "Ucuz",
    selected: false,
  },
  {
    name: "Orta",
    selected: false,
  },
  {
    name: "Pahalı",
    selected: false,
  },
  {
    name: "Farketmez",
    selected: false,
  },
];

const pools = [
  {
    name: "Herkese Açık Etkinlikler",
    selected: false,
  },
  {
    name: "Kendi Etkinliklerim",
    selected: false,
  },
];

const times = [
  "00:00",
  "01:00",
  "02:00",
  "03:00",

  "04:00",
  "05:00",
  "06:00",
  "07:00",

  "08:00",
  "09:00",
  "10:00",
  "11:00",

  "12:00",
  "13:00",
  "14:00",
  "15:00",

  "16:00",
  "17:00",
  "18:00",
  "19:00",

  "20:00",
  "21:00",
  "22:00",
  "23:00",

  "Tüm Gün",
];

export { where, cost, pools, times };
