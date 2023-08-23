import { Ultra, Indie_Flower, Playfair_Display } from "next/font/google";

const ultra = Ultra({
  subsets: ["latin"],
  weight: "400",
});
const indie = Indie_Flower({
  subsets: ["latin"],
  weight: "400",
});
const PF = Playfair_Display({
  subsets: ["latin"],
});
export { PF, indie, ultra };
