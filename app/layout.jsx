import "@styles/globals.css";
import Nav from "@components/Nav";
import Provider from "@components/Provider";

export const metadata = {
  title: "PromptPlanet",
  description: "A platform for generating and sharing AI prompts.",
};
const RootLayout = ({ children }) => {
  return (
    <Provider>
      <html lang="en">
        <body>
          <div className="name">
            <div className="gradient" />
          </div>
          <main className="app">
            <Nav />
            {children}
          </main>
        </body>
      </html>
    </Provider>
  );
};

export default RootLayout;
