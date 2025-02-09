import './globals.css';

export const metadata = {
  title: 'Personal Data Assistant',
  description: 'Chat with your PDF documents',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
