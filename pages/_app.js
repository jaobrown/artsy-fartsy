import "../styles/globals.css";
import { CloudinaryContext } from "cloudinary-react";

function MyApp({ Component, pageProps }) {
  return (
    <CloudinaryContext cloudName="koda-studio">
      <Component {...pageProps} />
    </CloudinaryContext>
  );
}

export default MyApp;
